const mongoose = require('mongoose');
const Content = require('./models/Content');
require('dotenv').config();

const seedContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing content
    await Content.deleteMany({});
    console.log('Cleared existing content');

    const contentData = [
      {
        section: 'home',
        content: {
          heroMainTitle: 'Transform Your Business with',
          heroHighlightTitle: 'Digital Excellence',
          heroSubtitle: 'We help businesses grow through innovative web development, digital marketing, and strategic consulting solutions that deliver measurable results.',
          heroBadgeText: 'Trusted by 500+ Businesses Worldwide',
          heroBenefit1: 'Custom Web Development & Design',
          heroBenefit2: 'Data-Driven Digital Marketing',
          heroBenefit3: 'Strategic Business Consulting',
          heroCTAButton: 'Get Started Today',
          heroSecondaryButton: 'Watch Demo',
          sectionTitle: 'Why Choose Us',
          title: 'Our Approach to Excellence',
          description: 'We combine strategic thinking with technical expertise to deliver solutions that drive real business growth',
          stat1Number: '500+',
          stat1Label: 'Happy Clients',
          stat1Description: 'Businesses transformed',
          stat2Number: '1000+',
          stat2Label: 'Projects Delivered',
          stat2Description: 'Successful launches',
          stat3Number: '10+',
          stat3Label: 'Years Experience',
          stat3Description: 'Industry expertise',
          stat4Number: '99%',
          stat4Label: 'Client Satisfaction',
          stat4Description: 'Success rate',
          bottomMessage: 'Every project is an opportunity to exceed expectations and build lasting partnerships',
          servicesTitle: 'Our Services',
          servicesSubtitle: 'Comprehensive digital solutions to grow your business',
          portfolioTitle: 'Our Work',
          portfolioSubtitle: 'Recent projects that showcase our expertise',
          testimonialsTitle: 'What Our Clients Say',
          testimonialsSubtitle: 'Real feedback from satisfied customers',
          ctaTitle: 'Ready to Transform Your Business?',
          ctaSubtitle: 'Let\'s discuss your project and create something amazing together.',
          ctaButtonText: 'Start Your Project'
        }
      },
      {
        section: 'about',
        content: {
          heroTitle: 'About Roof Biz Solutions',
          heroBadgeText: 'Trusted Digital Partner Since 2014',
          heroSubtitle: 'We\'re a team of passionate professionals dedicated to transforming businesses through innovative digital solutions that drive real results.',
          storyTitle: 'Our Story',
          storyDescription1: 'Founded with a vision to bridge the gap between innovative technology and business success, Roof Biz Solutions has been at the forefront of digital transformation for over a decade.',
          storyDescription2: 'We believe that every business deserves access to cutting-edge digital solutions that drive growth, enhance customer experience, and create lasting value.',
          storyPoint1: 'Expert team with 10+ years experience',
          storyPoint2: 'Proven track record of successful projects',
          storyPoint3: 'Cutting-edge technology solutions',
          storyPoint4: 'Dedicated support and maintenance',
          valuesTitle: 'Our Core Values',
          valuesSubtitle: 'The principles that guide everything we do',
          value1Title: 'Trust & Reliability',
          value1Description: 'We build lasting relationships through transparent communication and reliable delivery.',
          value2Title: 'Innovation First',
          value2Description: 'We stay ahead of technology trends to provide cutting-edge solutions for our clients.',
          value3Title: 'Results Driven',
          value3Description: 'Every project is measured by its impact on your business growth and success metrics.',
          value4Title: 'Client Focused',
          value4Description: 'Your success is our success. We work as an extension of your team to achieve your goals.'
        }
      },
      {
        section: 'contact',
        content: {
          heroTitle: 'Get In Touch',
          heroBadgeText: 'Let\'s Start a Conversation',
          heroSubtitle: 'Ready to transform your business? Let\'s discuss your project and create something amazing together.',
          formTitle: 'Send us a message',
          formSubtitle: 'Fill out the form below and we\'ll get back to you within 24 hours.',
          contactTitle: 'Let\'s Connect',
          contactDescription: 'We\'d love to hear from you. Choose the most convenient way to get in touch, and we\'ll respond promptly.',
          responseTime: 'Average response time: 2 hours',
          email: 'info@roofbizsolutions.com',
          emailDescription: 'Send us an email anytime',
          phone: '+1 (234) 567-890',
          phoneDescription: 'Mon-Fri from 8am to 5pm',
          address: '123 Business St, City, State 12345',
          addressDescription: 'Visit us for a coffee chat'
        }
      },
      {
        section: 'services',
        content: {
          heroTitle: 'Our Services',
          heroBadgeText: 'Comprehensive Digital Solutions',
          heroSubtitle: 'We offer a full range of digital services to help your business grow and succeed in the digital landscape.',
          servicesTitle: 'What We Offer',
          servicesSubtitle: 'Professional services tailored to your business needs',
          ctaTitle: 'Ready to Get Started?',
          ctaSubtitle: 'Let\'s discuss your project requirements and create a custom solution for your business.',
          ctaButtonText: 'Contact Us Today'
        }
      },
      {
        section: 'portfolio',
        content: {
          heroTitle: 'Our Portfolio',
          heroBadgeText: 'Showcasing Our Best Work',
          heroSubtitle: 'Explore our recent projects and see how we\'ve helped businesses transform their digital presence.',
          portfolioTitle: 'Featured Projects',
          portfolioSubtitle: 'A collection of our most successful client projects',
          filterAll: 'All Projects',
          filterWeb: 'Web Development',
          filterMobile: 'Mobile Apps',
          filterDesign: 'UI/UX Design',
          filterMarketing: 'Digital Marketing'
        }
      },
      {
        section: 'blog',
        content: {
          heroTitle: 'Our Blog',
          heroBadgeText: 'Insights & Updates',
          heroSubtitle: 'Stay updated with the latest trends, tips, and insights from our team of experts.',
          blogTitle: 'Latest Articles',
          blogSubtitle: 'Expert insights on digital transformation and business growth',
          categoryAll: 'All Posts',
          categoryTech: 'Technology',
          categoryBusiness: 'Business',
          categoryDesign: 'Design',
          categoryMarketing: 'Marketing'
        }
      }
    ];

    await Content.insertMany(contentData);
    console.log('Content seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding content:', error);
    process.exit(1);
  }
};

seedContent();