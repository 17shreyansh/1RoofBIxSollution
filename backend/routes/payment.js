const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Service = require('../models/Service');
const Settings = require('../models/Settings');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Simple decrypt function
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

// Create order
router.post('/create-order', async (req, res) => {
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
    
    // Check if customer exists or create new one
    let customer = await Customer.findOne({ email: customerDetails.email });
    if (!customer) {
      const tempPassword = Math.random().toString(36).slice(-8);
      customer = new Customer({
        email: customerDetails.email,
        password: tempPassword,
        name: customerDetails.name,
        phone: customerDetails.phone,
        company: customerDetails.company
      });
      await customer.save();
    }
    
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

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerId } = req.body;
    
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
    
    // Generate JWT token for customer
    const customer = await Customer.findById(customerId);
    const token = jwt.sign({ id: customer._id, type: 'customer' }, process.env.JWT_SECRET);
    
    res.json({ 
      success: true, 
      token,
      customer: {
        id: customer._id,
        email: customer.email,
        name: customer.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;