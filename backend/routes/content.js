const express = require('express');
const Content = require('../models/Content');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all content
router.get('/', async (req, res) => {
  try {
    const content = await Content.find();
    const contentObj = {};
    content.forEach(item => {
      contentObj[item.section] = item.content;
    });
    res.json(contentObj);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get content by section
router.get('/:section', async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json(content.content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const { section, content } = req.body;
    
    const updatedContent = await Content.findOneAndUpdate(
      { section },
      { content },
      { new: true, upsert: true }
    );
    
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;