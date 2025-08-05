const mongoose = require('mongoose');
const slugify = require('slugify');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  shortDescription: String,
  image: String,
  gallery: [String],
  category: String,
  services: [String],
  client: {
    name: String,
    logo: String,
    website: String
  },
  projectUrl: String,
  technologies: [String],
  results: {
    metrics: [{
      label: String,
      value: String,
      improvement: String
    }],
    testimonial: String
  },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

portfolioSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

portfolioSchema.pre('insertMany', function(next, docs) {
  docs.forEach(doc => {
    if (!doc.slug && doc.title) {
      doc.slug = slugify(doc.title, { lower: true, strict: true });
    }
  });
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);