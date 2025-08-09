const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import all models
const User = require('./models/User');
const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Blog = require('./models/Blog');
const Product = require('./models/Product');
const Testimonial = require('./models/Testimonial');
const PricingPlan = require('./models/PricingPlan');
const Partner = require('./models/Partner');
const Content = require('./models/Content');
const Page = require('./models/Page');

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Connected to MongoDB');

    // Clear all existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Portfolio.deleteMany({}),
      Blog.deleteMany({}),
      Product.deleteMany({}),
      Testimonial.deleteMany({}),
      PricingPlan.deleteMany({}),
      Partner.deleteMany({}),
      Content.deleteMany({}),
      Page.deleteMany({})
    ]);
    console.log('✅ Existing data cleared');

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@1roofbizsolution.com',
      password: 'admin123',
      role: 'super_admin'
    });
    await adminUser.save();
    console.log('✅ Admin user created');

    // Seed Services
    console.log('🛠️ Seeding services...');
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
        isFeatured: true,
        order: 1
      },
      {
        name: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
        shortDescription: 'iOS and Android mobile applications',
        category: 'Development',
        deliveryTime: '6-8 weeks',
        features: ['Cross Platform', 'Native Performance', 'App Store Ready', 'Push Notifications'],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        pricing: {
          basic: { price: 50000, features: ['Basic App', 'iOS or Android', '5 Screens'] },
          standard: { price: 80000, features: ['Both Platforms', '10 Screens', 'API Integration'] },
          premium: { price: 120000, features: ['Advanced Features', 'Backend', 'Admin Panel'] }
        },
        isActive: true,
        isFeatured: true,
        order: 2
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
        order: 3
      }
    ];
    await Service.insertMany(services);
    console.log('✅ Services seeded');

    // Seed Portfolio
    console.log('💼 Seeding portfolio...');
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
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with advanced security features.',
        shortDescription: 'iOS and Android banking app',
        category: 'Mobile Development',
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
    console.log('✅ Portfolio seeded');

    // Seed Content
    console.log('📝 Seeding content...');
    const defaultContent = {
      home: {
        heroMainTitle: 'Transform Your Business with',
        heroHighlightTitle: 'Digital Excellence',
        heroSubtitle: 'We help businesses grow through innovative web development, digital marketing, and strategic consulting solutions that deliver measurable results.',
        heroBadgeText: 'Trusted by 500+ Businesses Worldwide',
        heroBenefit1: 'Custom Web Development & Design',
        heroBenefit2: 'Data-Driven Digital Marketing',
        heroBenefit3: 'Strategic Business Consulting',
        heroCTAButton: 'Get Started Today',
        heroSecondaryButton: 'Watch Demo',
        stat1Number: '500+',
        stat1Label: 'Happy Clients',
        stat2Number: '1000+',
        stat2Label: 'Projects Completed',
        stat3Number: '10+',
        stat3Label: 'Years Experience',
        stat4Number: '99%',
        stat4Label: 'Client Satisfaction'
      },
      about: {
        heroTitle: 'About 1roofBizSolution',
        heroBadgeText: 'Trusted Digital Partner Since 2014',
        heroSubtitle: 'We\'re a team of passionate professionals dedicated to transforming businesses through innovative digital solutions that drive real results.'
      },
      contact: {
        heroTitle: 'Get In Touch',
        heroBadgeText: 'Let\'s Start a Conversation',
        heroSubtitle: 'Ready to transform your business? Let\'s discuss your project and create something amazing together.',
        email: 'info@1roofbizsolution.com',
        phone: '+91 98765 43210',
        address: 'Mumbai, Maharashtra, India'
      }
    };

    for (const [section, content] of Object.entries(defaultContent)) {
      await Content.create({ section, content });
    }
    console.log('✅ Content seeded');

    // Seed Testimonials
    console.log('💬 Seeding testimonials...');
    const testimonials = [
      {
        name: 'John Smith',
        role: 'CEO, TechCorp',
        content: '1roofBizSolution delivered an exceptional website that exceeded our expectations.',
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
    console.log('✅ Testimonials seeded');

    // Seed Blog Posts
    console.log('📰 Seeding blog posts...');
    const blogPosts = [
      {
        title: 'The Future of Web Development',
        content: '<p>Web development is evolving rapidly with new technologies and frameworks emerging constantly. In this post, we explore the latest trends shaping the future of web development.</p>',
        excerpt: 'Exploring the latest trends in web development and emerging technologies',
        category: 'Technology',
        tags: ['Web Development', 'Technology', 'Trends'],
        author: 'Admin User',
        readTime: 5,
        isPublished: true,
        publishedAt: new Date(),
        seo: {
          metaTitle: 'The Future of Web Development - 1roofBizSolution',
          metaDescription: 'Discover the latest trends and technologies shaping the future of web development.',
          keywords: ['web development', 'technology', 'trends', 'future']
        }
      },
      {
        title: 'Digital Marketing Strategies for 2024',
        content: '<p>Digital marketing continues to evolve with new platforms, technologies, and consumer behaviors. Learn about the most effective strategies for 2024.</p>',
        excerpt: 'Discover the most effective digital marketing strategies for the modern business landscape',
        category: 'Marketing',
        tags: ['Digital Marketing', 'SEO', 'Social Media'],
        author: 'Marketing Team',
        readTime: 7,
        isPublished: true,
        publishedAt: new Date(Date.now() - 86400000),
        seo: {
          metaTitle: 'Digital Marketing Strategies for 2024',
          metaDescription: 'Learn about the most effective digital marketing strategies for modern businesses.',
          keywords: ['digital marketing', 'SEO', 'social media', '2024']
        }
      },
      {
        title: 'Mobile App Development Best Practices',
        content: '<p>Creating successful mobile applications requires following industry best practices and staying updated with the latest development trends.</p>',
        excerpt: 'Essential best practices for developing high-quality mobile applications',
        category: 'Development',
        tags: ['Mobile Development', 'React Native', 'Flutter'],
        author: 'Development Team',
        readTime: 6,
        isPublished: true,
        publishedAt: new Date(Date.now() - 172800000),
        seo: {
          metaTitle: 'Mobile App Development Best Practices',
          metaDescription: 'Learn the essential best practices for developing high-quality mobile applications.',
          keywords: ['mobile development', 'react native', 'flutter', 'best practices']
        }
      }
    ];
    await Blog.insertMany(blogPosts);
    console.log('✅ Blog posts seeded');

    // Seed Products
    console.log('🛍️ Seeding products...');
    const products = [
      {
        name: 'Website Template',
        description: 'Professional website template for businesses',
        type: 'digital',
        price: 99,
        category: 'Templates',
        isActive: true,
        isFeatured: true
      }
    ];
    await Product.insertMany(products);
    console.log('✅ Products seeded');

    // Seed Pricing Plans
    console.log('💰 Seeding pricing plans...');
    const pricingPlans = [
      {
        name: 'Starter Website',
        price: 15000,
        features: ['5 Pages', 'Responsive Design', 'Basic SEO', 'Contact Form'],
        deliveryTime: '2 weeks',
        serviceCategory: 'web-development',
        isActive: true,
        order: 1
      },
      {
        name: 'Business Website',
        price: 30000,
        features: ['10 Pages', 'CMS Integration', 'Advanced SEO', 'Analytics'],
        deliveryTime: '3 weeks',
        serviceCategory: 'web-development',
        isPopular: true,
        isActive: true,
        order: 2
      }
    ];
    await PricingPlan.insertMany(pricingPlans);
    console.log('✅ Pricing plans seeded');

    // Seed Partners
    console.log('🤝 Seeding partners...');
    const partners = [
      {
        name: 'Google Partner',
        logo: '/images/google-partner.png',
        type: 'certification',
        isActive: true,
        order: 1
      }
    ];
    await Partner.insertMany(partners);
    console.log('✅ Partners seeded');

    console.log('🎉 All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();