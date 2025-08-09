const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  encrypted: { type: Boolean, default: false },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);