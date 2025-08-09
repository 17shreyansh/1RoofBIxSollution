const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  packageType: { type: String, enum: ['basic', 'standard', 'premium'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'processing', 'completed', 'cancelled', 'refunded'], 
    default: 'pending' 
  },
  paymentId: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    company: String,
    requirements: String
  },
  deliveryDate: Date,
  notes: String,
  adminNotes: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);