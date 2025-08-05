const express = require('express');
const router = express.Router();
const PricingPlan = require('../models/PricingPlan');
const auth = require('../middleware/auth');

// Get all pricing plans
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.serviceCategory = category;
    
    const plans = await PricingPlan.find(filter).sort({ order: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pricing plans (admin)
router.get('/admin', auth, async (req, res) => {
  try {
    const plans = await PricingPlan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create pricing plan
router.post('/', auth, async (req, res) => {
  try {
    const plan = new PricingPlan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update pricing plan
router.put('/:id', auth, async (req, res) => {
  try {
    const plan = await PricingPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete pricing plan
router.delete('/:id', auth, async (req, res) => {
  try {
    const plan = await PricingPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;