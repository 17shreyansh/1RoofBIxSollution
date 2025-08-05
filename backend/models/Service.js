const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  shortDescription: String,
  icon: String,
  image: String,
  features: [String],
  pricing: {
    basic: { price: Number, features: [String] },
    standard: { price: Number, features: [String] },
    premium: { price: Number, features: [String] }
  },
  deliveryTime: String,
  category: String,
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

serviceSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

serviceSchema.pre('insertMany', function(next, docs) {
  docs.forEach(doc => {
    if (!doc.slug && doc.name) {
      doc.slug = slugify(doc.name, { lower: true, strict: true });
    }
  });
  next();
});

module.exports = mongoose.model('Service', serviceSchema);