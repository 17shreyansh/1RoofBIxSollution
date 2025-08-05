const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: { 
    type: String, 
    required: true, 
    enum: ['home', 'about', 'contact'],
    unique: true 
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);