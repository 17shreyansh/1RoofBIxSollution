const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  billingPeriod: {
    type: String,
    enum: ['monthly', 'yearly', 'one-time'],
    default: 'one-time'
  },
  features: [String],
  deliveryTime: String,
  ctaLabel: {
    type: String,
    default: 'Get Started'
  },
  serviceCategory: {
    type: String,
    required: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PricingPlan', pricingPlanSchema);