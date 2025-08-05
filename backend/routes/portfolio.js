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

// Admin routes (must come before /:slug)
router.get('/admin', async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ order: 1, createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching admin portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get portfolio by ID for admin editing
router.get('/admin/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio by ID:', error);
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

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
  try {
    const portfolioData = { ...req.body };
    
    // Parse JSON fields
    if (portfolioData.services) portfolioData.services = JSON.parse(portfolioData.services);
    if (portfolioData.technologies) portfolioData.technologies = JSON.parse(portfolioData.technologies);
    if (portfolioData.client) portfolioData.client = JSON.parse(portfolioData.client);
    if (portfolioData.results) portfolioData.results = JSON.parse(portfolioData.results);
    
    if (req.files?.image) portfolioData.image = `/uploads/${req.files.image[0].filename}`;
    if (req.files?.gallery) portfolioData.gallery = req.files.gallery.map(file => `/uploads/${file.filename}`);
    
    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', (req, res) => {
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }])(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }
    
    try {
      const updateData = { ...req.body };
      
      // Parse JSON fields safely
      try {
        if (updateData.services && typeof updateData.services === 'string') {
          updateData.services = JSON.parse(updateData.services);
        }
        if (updateData.technologies && typeof updateData.technologies === 'string') {
          updateData.technologies = JSON.parse(updateData.technologies);
        }
        if (updateData.client && typeof updateData.client === 'string') {
          updateData.client = JSON.parse(updateData.client);
        }
        if (updateData.results && typeof updateData.results === 'string') {
          updateData.results = JSON.parse(updateData.results);
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
      }
      
      if (req.files?.image) updateData.image = `/uploads/${req.files.image[0].filename}`;
      if (req.files?.gallery) updateData.gallery = req.files.gallery.map(file => `/uploads/${file.filename}`);
      
      const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      res.json(portfolio);
    } catch (error) {
      console.error('Error updating portfolio:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
});

router.delete('/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;