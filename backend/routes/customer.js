const express = require('express');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const customerAuth = require('../middleware/customerAuth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Customer signup
router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, phone, company, password } = req.body;
    
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const customer = new Customer({
      name,
      email,
      phone,
      company,
      password
    });
    
    await customer.save();
    
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Customer login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    
    if (!customer || !(await customer.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    customer.lastLogin = new Date();
    await customer.save();
    
    const token = jwt.sign({ id: customer._id, type: 'customer' }, process.env.JWT_SECRET);
    
    res.json({
      token,
      customer: {
        id: customer._id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        company: customer.company
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer profile
router.get('/profile', customerAuth, async (req, res) => {
  res.json({
    id: req.customer._id,
    email: req.customer.email,
    name: req.customer.name,
    phone: req.customer.phone,
    company: req.customer.company
  });
});

// Update customer profile
router.put('/profile', customerAuth, async (req, res) => {
  try {
    const { name, phone, company } = req.body;
    
    req.customer.name = name || req.customer.name;
    req.customer.phone = phone || req.customer.phone;
    req.customer.company = company || req.customer.company;
    
    await req.customer.save();
    
    res.json({
      id: req.customer._id,
      email: req.customer.email,
      name: req.customer.name,
      phone: req.customer.phone,
      company: req.customer.company
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer orders
router.get('/orders', customerAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.customer._id })
      .populate('service', 'name description')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific order
router.get('/orders/:orderId', customerAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderId: req.params.orderId, 
      user: req.customer._id 
    }).populate('service');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;