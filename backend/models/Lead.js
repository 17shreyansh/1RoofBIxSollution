const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  service: String,
  product: String,
  message: String,
  budget: String,
  timeline: String,
  type: { type: String, enum: ['contact', 'quote', 'product', 'consultation'], default: 'contact' },
  status: { type: String, enum: ['new', 'in-progress', 'replied', 'converted', 'closed'], default: 'new' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  source: String,
  notes: [{
    content: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now }
  }],
  assignedTo: String,
  lastContactedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);