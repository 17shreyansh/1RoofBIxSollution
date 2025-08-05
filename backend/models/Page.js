const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: {
    hero: {
      title: String,
      subtitle: String,
      backgroundImage: String,
      ctaButtons: [{ text: String, link: String, type: String }]
    },
    sections: [{
      type: String,
      title: String,
      content: String,
      items: [mongoose.Schema.Types.Mixed],
      order: Number
    }]
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);