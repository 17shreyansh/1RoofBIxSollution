const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all partners
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { isActive: true };
    if (type) filter.type = type;
    
    const partners = await Partner.find(filter).sort({ order: 1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all partners (admin)
router.get('/admin', auth, async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create partner
router.post('/', auth, upload.single('logo'), async (req, res) => {
  try {
    const partnerData = req.body;
    if (req.file) {
      partnerData.logo = `/uploads/${req.file.filename}`;
    }
    
    const partner = new Partner(partnerData);
    await partner.save();
    res.status(201).json(partner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update partner
router.put('/:id', auth, upload.single('logo'), async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.logo = `/uploads/${req.file.filename}`;
    }
    
    const partner = await Partner.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete partner
router.delete('/:id', auth, async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;