const express = require('express');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

const router = express.Router();

// Submit lead form
router.post('/', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json({ message: 'Thank you for your inquiry. We will contact you soon!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all leads (admin)
router.get('/admin', async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    
    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lead status (admin)
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete lead (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add note to lead
router.post('/:id/notes', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    
    lead.notes.push({
      content: req.body.content,
      addedBy: null,
      addedAt: new Date()
    });
    
    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Export leads to CSV
router.get('/export', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    
    const csvHeader = 'Name,Email,Phone,Company,Service,Product,Type,Status,Message,Created At\n';
    const csvData = leads.map(lead => 
      `"${lead.name}","${lead.email}","${lead.phone || ''}","${lead.company || ''}","${lead.service || ''}","${lead.product || ''}","${lead.type}","${lead.status}","${lead.message || ''}","${lead.createdAt}"`
    ).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csvHeader + csvData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;