const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Testimonial = require('./models/Testimonial');
const Page = require('./models/Page');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    await Testimonial.deleteMany({});
    await Page.deleteMany({});

    // Create admin user
    const adminUser = new User({
      email: 'admin@roofbizsolutions.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create services
    const services = [
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Custom websites built with modern technologies',
        category: 'Development',
        pricing: {
          basic: { price: 999, features: ['Responsive Design', 'SEO Optimized', '3 Pages'] },
          standard: { price: 2999, features: ['Custom Design', 'CMS Integration', '10 Pages', 'Contact Forms'] },
          premium: { price: 5999, features: ['E-commerce Ready', 'Advanced Features', 'Unlimited Pages', 'Priority Support'] }
        },
        deliveryTime: '2-4 weeks',
        isActive: true,
        order: 1
      },
      {
        name: 'App Development',
        slug: 'app-development',
        description: 'Native and cross-platform mobile applications',
        category: 'Development',
        pricing: {
          basic: { price: 4999, features: ['iOS or Android', 'Basic Features', 'App Store Submission'] },
          standard: { price: 9999, features: ['iOS + Android', 'Advanced Features', 'Backend Integration'] },
          premium: { price: 19999, features: ['Custom Features', 'Real-time Updates', 'Analytics Integration'] }
        },
        deliveryTime: '6-12 weeks',
        isActive: true,
        order: 2
      },
      {
        name: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Comprehensive digital marketing strategies',
        category: 'Marketing',
        pricing: {
          basic: { price: 1499, features: ['Social Media Management', 'Content Creation', 'Monthly Reports'] },
          standard: { price: 2999, features: ['PPC Campaigns', 'Email Marketing', 'SEO Optimization'] },
          premium: { price: 4999, features: ['Full Marketing Suite', 'Advanced Analytics', 'Dedicated Manager'] }
        },
        deliveryTime: 'Ongoing',
        isActive: true,
        order: 3
      }
    ];

    await Service.insertMany(services);
    console.log('Services created');

    // Create portfolio items
    const portfolio = [
      {
        title: 'E-commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Modern e-commerce solution with advanced features',
        category: 'E-commerce',
        services: ['Web Development', 'Digital Marketing'],
        client: 'TechStore Inc.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        isActive: true
      },
      {
        title: 'Mobile Banking App',
        slug: 'mobile-banking-app',
        description: 'Secure mobile banking application',
        category: 'Mobile App',
        services: ['App Development'],
        client: 'SecureBank',
        technologies: ['React Native', 'Node.js', 'PostgreSQL'],
        isActive: true
      }
    ];

    await Portfolio.insertMany(portfolio);
    console.log('Portfolio items created');

    // Create testimonials
    const testimonials = [
      {
        name: 'John Smith',
        company: 'TechCorp',
        position: 'CEO',
        content: 'Roof Biz Solutions transformed our digital presence. Highly recommended!',
        rating: 5,
        isActive: true
      },
      {
        name: 'Sarah Johnson',
        company: 'StartupXYZ',
        position: 'Founder',
        content: 'Professional team with excellent results. They delivered beyond expectations.',
        rating: 5,
        isActive: true
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials created');

    // Create home page
    const homePage = new Page({
      slug: 'home',
      title: 'Home - Roof Biz Solutions',
      content: {
        hero: {
          title: 'One Partner. All Solutions.',
          subtitle: 'We Turn Ideas Into Brands. Brands Into Businesses.',
          ctaButtons: [
            { text: 'Book a Free Strategy Call', link: '/contact', type: 'primary' },
            { text: 'Explore Services', link: '/services', type: 'secondary' }
          ]
        },
        sections: [
          {
            type: 'about',
            title: 'Why Choose Us',
            content: 'We are your strategic partner in digital transformation.',
            order: 1
          }
        ]
      },
      seo: {
        metaTitle: 'Roof Biz Solutions - Digital Agency',
        metaDescription: 'Professional digital solutions for your business growth',
        keywords: ['web development', 'digital marketing', 'app development']
      },
      isActive: true
    });

    await homePage.save();
    console.log('Home page created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();