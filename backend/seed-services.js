const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

const services = [
  {
    name: 'Web Development',
    description: 'Transform your digital presence with cutting-edge web development solutions.',
    shortDescription: 'Custom websites and web applications built with modern technologies',
    category: 'Development',
    deliveryTime: '2-4 weeks',
    features: ['Responsive Design', 'Modern Frameworks', 'SEO Optimized', 'Fast Loading'],
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    pricing: {
      basic: { price: 29999, features: ['Up to 5 pages', 'Responsive design', 'Basic SEO'] },
      standard: { price: 49999, features: ['Up to 10 pages', 'Advanced features', 'Complete SEO'] },
      premium: { price: 79999, features: ['Unlimited pages', 'Custom functionality', 'E-commerce'] }
    },
    isActive: true,
    isFeatured: false,
    order: 1
  },
  {
    name: 'Digital Marketing',
    description: 'Boost your online presence with comprehensive digital marketing strategies.',
    shortDescription: 'SEO, PPC, social media, and content marketing services',
    category: 'Marketing',
    deliveryTime: 'Ongoing',
    features: ['SEO Optimization', 'PPC Campaigns', 'Social Media', 'Analytics'],
    technologies: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'SEMrush'],
    pricing: {
      basic: { price: 14999, features: ['Basic SEO', 'Social media setup', 'Monthly reporting'] },
      standard: { price: 29999, features: ['Complete SEO', 'PPC management', 'Weekly reporting'] },
      premium: { price: 49999, features: ['Full strategy', 'Multi-platform', 'Daily monitoring'] }
    },
    isActive: true,
    isFeatured: true,
    order: 2
  }
];

async function seedServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roofbiz');
    console.log('Connected to MongoDB');
    
    await Service.deleteMany({});
    console.log('Cleared existing services');
    
    await Service.insertMany(services);
    console.log('Services seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
}

seedServices();