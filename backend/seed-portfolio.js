const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');
require('dotenv').config();

const portfolioItems = [
  {
    title: 'E-commerce Platform',
    description: 'A comprehensive e-commerce solution built for a growing retail business.',
    shortDescription: 'Modern online store with advanced features',
    category: 'Web Development',
    services: ['Web Development', 'E-commerce', 'UI/UX Design'],
    client: {
      name: 'RetailMax Solutions',
      website: 'https://retailmax.com'
    },
    projectUrl: 'https://demo-ecommerce.com',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    results: {
      metrics: [
        { label: 'Sales Increase', value: '250%', improvement: '+150%' },
        { label: 'Page Load Speed', value: '1.2s', improvement: '60% faster' }
      ]
    },
    isActive: true,
    isFeatured: true,
    order: 1
  },
  {
    title: 'Brand Identity Design',
    description: 'Complete brand transformation for a tech startup.',
    shortDescription: 'Complete brand redesign and visual identity',
    category: 'Design',
    services: ['Brand Design', 'Logo Design', 'Marketing Materials'],
    client: {
      name: 'TechVision Startup',
      website: 'https://techvision.com'
    },
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop'],
    results: {
      metrics: [
        { label: 'Brand Recognition', value: '85%', improvement: '+300%' },
        { label: 'Customer Trust', value: '92%', improvement: '+180%' }
      ]
    },
    isActive: true,
    isFeatured: false,
    order: 2
  }
];

async function seedPortfolio() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roofbiz');
    console.log('Connected to MongoDB');
    
    await Portfolio.deleteMany({});
    console.log('Cleared existing portfolio');
    
    await Portfolio.insertMany(portfolioItems);
    console.log('Portfolio seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding portfolio:', error);
    process.exit(1);
  }
}

seedPortfolio();