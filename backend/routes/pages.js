const express = require('express');
const Page = require('../models/Page');
const auth = require('../middleware/auth');

const router = express.Router();

// Get page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isActive: true });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all pages (admin)
router.get('/', auth, async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create/Update page (admin)
router.post('/', auth, async (req, res) => {
  try {
    const { slug } = req.body;
    const page = await Page.findOneAndUpdate(
      { slug },
      req.body,
      { new: true, upsert: true }
    );
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;