const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Service = require('../models/Service');
const Settings = require('../models/Settings');
const customerAuth = require('../middleware/customerAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Simple base64 decoding
const decrypt = (text) => {
  return Buffer.from(text, 'base64').toString('utf8');
};

const router = express.Router();

// Get Razorpay instance
const getRazorpayInstance = async () => {
  const keyId = await Settings.findOne({ key: 'razorpay_key_id' });
  const keySecretDoc = await Settings.findOne({ key: 'razorpay_key_secret' });
  
  if (!keyId || !keySecretDoc) {
    throw new Error('Razorpay credentials not configured');
  }
  
  const keySecret = keySecretDoc.encrypted ? decrypt(keySecretDoc.value) : keySecretDoc.value;
  
  return new Razorpay({
    key_id: keyId.value,
    key_secret: keySecret
  });
};

// Create order (requires authentication)
router.post('/create-order', customerAuth, async (req, res) => {
  try {
    const { serviceId, packageType, customerDetails } = req.body;
    
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    const amount = service.pricing[packageType]?.price;
    if (!amount) {
      return res.status(400).json({ message: 'Invalid package type' });
    }
    
    const razorpay = await getRazorpayInstance();
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: orderId
    });
    
    // Use authenticated customer
    const customer = req.customer;
    
    // Update customer details if provided
    if (customerDetails.name) customer.name = customerDetails.name;
    if (customerDetails.phone) customer.phone = customerDetails.phone;
    if (customerDetails.company) customer.company = customerDetails.company;
    await customer.save();
    
    const order = new Order({
      orderId,
      user: customer._id,
      service: serviceId,
      packageType,
      amount,
      razorpayOrderId: razorpayOrder.id,
      customerDetails
    });
    
    await order.save();
    
    const keyId = await Settings.findOne({ key: 'razorpay_key_id' });
    
    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      customerId: customer._id,
      keyId: keyId.value
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment (requires authentication)
router.post('/verify-payment', customerAuth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const keySecretDoc = await Settings.findOne({ key: 'razorpay_key_secret' });
    const keySecret = keySecretDoc.encrypted ? decrypt(keySecretDoc.value) : keySecretDoc.value;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');
    
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }
    
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;