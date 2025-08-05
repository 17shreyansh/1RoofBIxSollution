const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all active portfolio items
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    
    const portfolio = await Portfolio.find(filter).sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get portfolio item by slug
router.get('/:slug', async (req, res) => {
  try {
    const item = await Portfolio.findOne({ slug: req.params.slug, isActive: true });
    if (!item) return res.status(404).json({ message: 'Portfolio item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
router.get('/admin', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const portfolioData = { ...req.body };
    if (req.file) portfolioData.image = `/uploads/${req.file.filename}`;
    
    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;