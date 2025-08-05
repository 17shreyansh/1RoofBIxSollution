const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Blog = require('./models/Blog');
const Product = require('./models/Product');
const Testimonial = require('./models/Testimonial');
const PricingPlan = require('./models/PricingPlan');
const Partner = require('./models/Partner');
const Content = require('./models/Content');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    await Blog.deleteMany({});
    await Product.deleteMany({});
    await Testimonial.deleteMany({});
    await PricingPlan.deleteMany({});
    await Partner.deleteMany({});
    await Content.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@roofbizsolutions.com',
      password: 'admin123',
      role: 'super_admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create services
    const services = [
      {
        name: 'Web Development',
        description: 'Custom web development solutions using modern technologies',
        shortDescription: 'Professional websites and web applications',
        category: 'web-development',
        deliveryTime: '2-4 weeks',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile Friendly'],
        pricing: {
          basic: { price: 1500, features: ['5 Pages', 'Basic SEO', 'Contact Form'] },
          standard: { price: 3000, features: ['10 Pages', 'Advanced SEO', 'CMS Integration'] },
          premium: { price: 5000, features: ['Unlimited Pages', 'E-commerce', 'Custom Features'] }
        },
        isActive: true,
        isFeatured: true,
        order: 1
      },
      {
        name: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications',
        shortDescription: 'iOS and Android mobile applications',
        category: 'mobile-development',
        deliveryTime: '6-8 weeks',
        features: ['Cross Platform', 'Native Performance', 'App Store Ready', 'Push Notifications'],
        pricing: {
          basic: { price: 5000, features: ['Basic App', 'iOS or Android', '5 Screens'] },
          standard: { price: 8000, features: ['Both Platforms', '10 Screens', 'API Integration'] },
          premium: { price: 12000, features: ['Advanced Features', 'Backend', 'Admin Panel'] }
        },
        isActive: true,
        isFeatured: true,
        order: 2
      },
      {
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies',
        shortDescription: 'SEO, PPC, and social media marketing',
        category: 'digital-marketing',
        deliveryTime: '1-2 weeks setup',
        features: ['SEO Optimization', 'PPC Campaigns', 'Social Media', 'Analytics'],
        pricing: {
          basic: { price: 800, features: ['Basic SEO', 'Social Media Setup', 'Monthly Reports'] },
          standard: { price: 1500, features: ['Advanced SEO', 'PPC Management', 'Content Creation'] },
          premium: { price: 2500, features: ['Full Service', 'Multiple Platforms', 'Dedicated Manager'] }
        },
        isActive: true,
        order: 3
      }
    ];

    await Service.insertMany(services);
    console.log('Services created');

    // Create portfolio items
    const portfolioItems = [
      {
        title: 'E-commerce Platform',
        description: 'Modern e-commerce solution with advanced features',
        shortDescription: 'Full-featured online store',
        category: 'web-development',
        services: ['Web Development', 'UI/UX Design'],
        client: {
          name: 'TechStore Inc.',
          website: 'https://techstore.com'
        },
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        results: {
          metrics: [
            { label: 'Sales Increase', value: '150%', improvement: '+150%' },
            { label: 'Page Load Speed', value: '2.1s', improvement: '60% faster' },
            { label: 'Mobile Traffic', value: '65%', improvement: '+40%' }
          ]
        },
        isActive: true,
        isFeatured: true,
        order: 1
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application',
        shortDescription: 'iOS and Android banking app',
        category: 'mobile-development',
        services: ['Mobile Development', 'Security'],
        client: {
          name: 'SecureBank',
          website: 'https://securebank.com'
        },
        technologies: ['React Native', 'Node.js', 'PostgreSQL'],
        results: {
          metrics: [
            { label: 'User Adoption', value: '85%', improvement: '+85%' },
            { label: 'Transaction Speed', value: '3s', improvement: '70% faster' }
          ]
        },
        isActive: true,
        isFeatured: true,
        order: 2
      }
    ];

    await Portfolio.insertMany(portfolioItems);
    console.log('Portfolio items created');

    // Create blog posts
    const blogPosts = [
      {
        title: 'The Future of Web Development',
        content: '<p>Web development is evolving rapidly with new technologies...</p>',
        excerpt: 'Exploring the latest trends in web development',
        category: 'Technology',
        tags: ['Web Development', 'Technology', 'Trends'],
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        seo: {
          metaTitle: 'The Future of Web Development - Roof Biz Solutions',
          metaDescription: 'Discover the latest trends and technologies shaping the future of web development.',
          keywords: ['web development', 'technology', 'trends', 'future']
        }
      },
      {
        title: 'Mobile App Development Best Practices',
        content: '<p>Building successful mobile applications requires following best practices...</p>',
        excerpt: 'Essential practices for mobile app development',
        category: 'Mobile',
        tags: ['Mobile Development', 'Best Practices', 'Apps'],
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        seo: {
          metaTitle: 'Mobile App Development Best Practices',
          metaDescription: 'Learn the essential best practices for successful mobile app development.',
          keywords: ['mobile development', 'best practices', 'apps', 'development']
        }
      }
    ];

    await Blog.insertMany(blogPosts);
    console.log('Blog posts created');

    // Create products
    const products = [
      {
        name: 'Website Template',
        description: 'Professional website template for businesses',
        type: 'digital',
        price: 99,
        category: 'Templates',
        isActive: true,
        isFeatured: true
      },
      {
        name: 'SEO Audit Service',
        description: 'Comprehensive SEO audit and recommendations',
        type: 'service',
        price: 299,
        category: 'SEO',
        isActive: true
      }
    ];

    await Product.insertMany(products);
    console.log('Products created');

    // Create testimonials
    const testimonials = [
      {
        name: 'John Smith',
        role: 'CEO, TechCorp',
        content: 'Roof Biz Solutions delivered an exceptional website that exceeded our expectations.',
        rating: 5,
        isActive: true,
        order: 1
      },
      {
        name: 'Sarah Johnson',
        role: 'Marketing Director, StartupXYZ',
        content: 'Their digital marketing expertise helped us increase our online presence significantly.',
        rating: 5,
        isActive: true,
        order: 2
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials created');

    // Create pricing plans
    const pricingPlans = [
      {
        name: 'Starter Website',
        price: 1500,
        features: ['5 Pages', 'Responsive Design', 'Basic SEO', 'Contact Form'],
        deliveryTime: '2 weeks',
        serviceCategory: 'web-development',
        isActive: true,
        order: 1
      },
      {
        name: 'Business Website',
        price: 3000,
        features: ['10 Pages', 'CMS Integration', 'Advanced SEO', 'Analytics'],
        deliveryTime: '3 weeks',
        serviceCategory: 'web-development',
        isPopular: true,
        isActive: true,
        order: 2
      },
      {
        name: 'Enterprise Website',
        price: 5000,
        features: ['Unlimited Pages', 'E-commerce', 'Custom Features', 'Priority Support'],
        deliveryTime: '4 weeks',
        serviceCategory: 'web-development',
        isActive: true,
        order: 3
      }
    ];

    await PricingPlan.insertMany(pricingPlans);
    console.log('Pricing plans created');

    // Create partners
    const partners = [
      {
        name: 'Google Partner',
        logo: '/images/google-partner.png',
        type: 'certification',
        isActive: true,
        order: 1
      },
      {
        name: 'AWS Partner',
        logo: '/images/aws-partner.png',
        type: 'certification',
        isActive: true,
        order: 2
      }
    ];

    await Partner.insertMany(partners);
    console.log('Partners created');

    // Create content
    const contentData = [
      {
        page: 'home',
        section: 'hero',
        content: {
          title: 'Transform Your Business with Digital Solutions',
          subtitle: 'Professional Web Development & Digital Marketing',
          description: 'We help businesses grow online with custom websites, mobile apps, and digital marketing strategies that deliver results.',
          ctaText: 'Get Started Today',
          ctaLink: '/contact',
          backgroundImage: '/images/hero-bg.jpg'
        },
        seo: {
          metaTitle: 'Roof Biz Solutions - Web Development & Digital Marketing',
          metaDescription: 'Professional web development, mobile apps, and digital marketing services to grow your business online.',
          keywords: ['web development', 'digital marketing', 'mobile apps', 'business growth']
        }
      },
      {
        page: 'home',
        section: 'services',
        content: {
          title: 'Our Services',
          description: 'We offer comprehensive digital solutions to help your business succeed online.'
        }
      },
      {
        page: 'about',
        section: 'hero',
        content: {
          title: 'About Roof Biz Solutions',
          description: 'We are a team of passionate developers and marketers dedicated to helping businesses succeed in the digital world.'
        }
      }
    ];

    await Content.insertMany(contentData);
    console.log('Content created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();