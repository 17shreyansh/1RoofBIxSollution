const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  featuredImage: String,
  category: String,
  tags: [String],
  author: { type: String, default: 'Admin' },
  readTime: Number,
  views: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  }
}, { timestamps: true });

blogSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Normalize tags
  if (this.tags) {
    this.tags = this.constructor.normalizeTags(this.tags);
  }
  
  next();
});

blogSchema.statics.normalizeTags = function(tagData) {
  if (!tagData) return [];
  
  let result = [];
  
  if (typeof tagData === 'string') {
    try {
      const parsed = JSON.parse(tagData);
      result = Array.isArray(parsed) ? parsed.flat(Infinity) : [parsed];
    } catch {
      result = tagData.split(',').map(t => t.trim()).filter(t => t);
    }
  } else if (Array.isArray(tagData)) {
    result = tagData.flat(Infinity);
  } else {
    result = [String(tagData)];
  }
  
  return [...new Set(
    result
      .map(tag => String(tag).replace(/["\'\[\]]/g, '').trim())
      .filter(tag => tag && tag.length > 0 && tag !== 'undefined' && tag !== 'null')
  )];
};

blogSchema.pre('insertMany', function(next, docs) {
  docs.forEach(doc => {
    if (!doc.slug && doc.title) {
      doc.slug = slugify(doc.title, { lower: true, strict: true });
    }
    if (doc.isPublished && !doc.publishedAt) {
      doc.publishedAt = new Date();
    }
  });
  next();
});

module.exports = mongoose.model('Blog', blogSchema);