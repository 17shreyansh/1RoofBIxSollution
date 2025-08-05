const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'about', 'services', 'portfolio', 'blog', 'contact', 'pricing']
  },
  section: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  }
}, {
  timestamps: true
});

contentSchema.index({ page: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);