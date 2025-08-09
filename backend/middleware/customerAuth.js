const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const customerAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== 'customer') {
      return res.status(401).json({ message: 'Invalid token type' });
    }
    
    const customer = await Customer.findById(decoded.id);
    
    if (!customer) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.customer = customer;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = customerAuth;