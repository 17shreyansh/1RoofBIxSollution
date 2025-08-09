const express = require('express');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');
const crypto = require('crypto');

const router = express.Router();

// Simple encryption for demo (use proper encryption in production)
const encrypt = (text) => {
  return Buffer.from(text).toString('base64');
};

const decrypt = (text) => {
  return Buffer.from(text, 'base64').toString('utf8');
};

// Get Razorpay settings
router.get('/razorpay', auth, async (req, res) => {
  try {
    const keyId = await Settings.findOne({ key: 'razorpay_key_id' });
    const keySecret = await Settings.findOne({ key: 'razorpay_key_secret' });
    
    res.json({
      keyId: keyId?.value || '',
      keySecret: keySecret ? '***HIDDEN***' : '',
      configured: !!(keyId && keySecret)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Razorpay settings
router.post('/razorpay', auth, async (req, res) => {
  try {
    const { keyId, keySecret } = req.body;
    
    if (!keyId || !keySecret) {
      return res.status(400).json({ message: 'Both Key ID and Key Secret are required' });
    }
    
    // Update or create Key ID
    await Settings.findOneAndUpdate(
      { key: 'razorpay_key_id' },
      { value: keyId, description: 'Razorpay Key ID' },
      { upsert: true }
    );
    
    // Update or create Key Secret (encrypted)
    await Settings.findOneAndUpdate(
      { key: 'razorpay_key_secret' },
      { 
        value: encrypt(keySecret), 
        encrypted: true,
        description: 'Razorpay Key Secret (Encrypted)' 
      },
      { upsert: true }
    );
    
    res.json({ message: 'Razorpay settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;