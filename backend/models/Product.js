const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  image: String,
  category: String,
  type: { type: String, enum: ['digital', 'service', 'physical'], default: 'digital' },
  price: Number,
  features: [String],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.pre('insertMany', function(next, docs) {
  docs.forEach(doc => {
    if (!doc.slug && doc.name) {
      doc.slug = slugify(doc.name, { lower: true, strict: true });
    }
  });
  next();
});

module.exports = mongoose.model('Product', productSchema);