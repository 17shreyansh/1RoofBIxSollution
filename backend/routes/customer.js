const express = require('express');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const customerAuth = require('../middleware/customerAuth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Check if email exists (rate limited)
router.post('/check-email', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.body;
    const customer = await Customer.findOne({ email }, { _id: 1 });
    
    // Add small delay to prevent email enumeration
    await new Promise(resolve => setTimeout(resolve, 200));
    
    res.json({ exists: !!customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Quick auth for checkout (login existing or create new)
router.post('/quick-auth', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').optional().notEmpty().trim(),
  body('phone').optional(),
  body('company').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password, name, phone, company } = req.body;
    let customer = await Customer.findOne({ email });
    
    if (customer) {
      // Login existing customer
      if (!(await customer.comparePassword(password))) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.status(401).json({ message: 'Invalid password' });
      }
      
      customer.lastLogin = new Date();
      await customer.save();
    } else {
      // Create new customer
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(password)) {
        return res.status(400).json({ 
          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
        });
      }
      
      customer = new Customer({
        name: name?.trim(),
        email,
        phone,
        company: company?.trim(),
        password
      });
      
      await customer.save();
    }
    
    const token = jwt.sign(
      { id: customer._id, type: 'customer' }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
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
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Customer signup with validation
router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('name').notEmpty().trim().isLength({ min: 2, max: 50 }),
  body('phone').optional().isMobilePhone()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }
    
    const { name, email, phone, company, password } = req.body;
    
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const customer = new Customer({
      name: name.trim(),
      email,
      phone,
      company: company?.trim(),
      password
    });
    
    await customer.save();
    
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Customer login with rate limiting
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
      // Add delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    customer.lastLogin = new Date();
    await customer.save();
    
    const token = jwt.sign(
      { id: customer._id, type: 'customer' }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
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