const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');

// Get content by page and section
router.get('/:page/:section', async (req, res) => {
  try {
    const content = await Content.findOne({
      page: req.params.page,
      section: req.params.section
    });
    res.json(content || { content: null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all content for a page
router.get('/:page', async (req, res) => {
  try {
    const content = await Content.find({ page: req.params.page });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update content (admin only)
router.put('/:page/:section', auth, async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { page: req.params.page, section: req.params.section },
      req.body,
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;