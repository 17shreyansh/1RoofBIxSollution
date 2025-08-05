import React, { useState, useEffect } from 'react';
import { 
  Tabs, 
  Card, 
  Form, 
  Input, 
  Button, 
  message, 
  Typography,
  Row,
  Col,
  Space,
  Divider
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import api from '../../utils/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContentManager = () => {
  const [loading, setLoading] = useState(false);
  const [homeForm] = Form.useForm();
  const [aboutForm] = Form.useForm();
  const [contactForm] = Form.useForm();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get('/content');
      const content = response.data || {};
      
      contactForm.setFieldsValue(content.contact || {
        // Hero Section
        heroTitle: 'Get In Touch',
        heroBadgeText: 'Let\'s Start a Conversation',
        heroSubtitle: 'Ready to transform your business? Let\'s discuss your project and create something amazing together.',
        
        // Contact Form Section
        formTitle: 'Send us a message',
        formSubtitle: 'Fill out the form below and we\'ll get back to you within 24 hours.',
        
        // Contact Info Section
        contactTitle: 'Let\'s Connect',
        contactDescription: 'We\'d love to hear from you. Choose the most convenient way to get in touch, and we\'ll respond promptly.',
        responseTime: 'Average response time: 2 hours',
        
        // Contact Details
        email: 'info@roofbizsolutions.com',
        emailDescription: 'Send us an email anytime',
        phone: '+1 (234) 567-890',
        phoneDescription: 'Mon-Fri from 8am to 5pm',
        address: '123 Business St, City, State 12345',
        addressDescription: 'Visit us for a coffee chat'
      });

      // Set form values with fetched content or defaults
      homeForm.setFieldsValue(content.home || {
        // Hero Section
        heroMainTitle: 'Transform Your Business with',
        heroHighlightTitle: 'Digital Excellence',
        heroSubtitle: 'We help businesses grow through innovative web development, digital marketing, and strategic consulting solutions that deliver measurable results.',
        heroBadgeText: 'Trusted by 500+ Businesses Worldwide',
        heroBenefit1: 'Custom Web Development & Design',
        heroBenefit2: 'Data-Driven Digital Marketing',
        heroBenefit3: 'Strategic Business Consulting',
        heroCTAButton: 'Get Started Today',
        heroSecondaryButton: 'Watch Demo',
        
        // Statistics
        stat1Number: '500+',
        stat1Label: 'Happy Clients',
        stat2Number: '1000+',
        stat2Label: 'Projects Completed',
        stat3Number: '10+',
        stat3Label: 'Years Experience',
        stat4Number: '99%',
        stat4Label: 'Client Satisfaction',
        
        // Section Titles
        servicesTitle: 'Our Services',
        servicesSubtitle: 'Comprehensive digital solutions to grow your business',
        portfolioTitle: 'Our Work',
        portfolioSubtitle: 'Recent projects that showcase our expertise',
        testimonialsTitle: 'What Our Clients Say',
        testimonialsSubtitle: 'Real feedback from satisfied customers',
        
        // CTA Section
        ctaTitle: 'Ready to Transform Your Business?',
        ctaSubtitle: 'Let\'s discuss your project and create something amazing together.',
        ctaButtonText: 'Start Your Project'
      });

      aboutForm.setFieldsValue(content.about || {
        // Hero Section
        heroTitle: 'About Roof Biz Solutions',
        heroBadgeText: 'Trusted Digital Partner Since 2014',
        heroSubtitle: 'We\'re a team of passionate professionals dedicated to transforming businesses through innovative digital solutions that drive real results.',
        
        // Statistics
        stat1Number: '500+',
        stat1Label: 'Happy Clients',
        stat2Number: '1000+',
        stat2Label: 'Projects Completed',
        stat3Number: '10+',
        stat3Label: 'Years Experience',
        stat4Number: '99%',
        stat4Label: 'Client Satisfaction',
        
        // Story Section
        storyTitle: 'Our Story',
        storyDescription1: 'Founded with a vision to bridge the gap between innovative technology and business success, Roof Biz Solutions has been at the forefront of digital transformation for over a decade.',
        storyDescription2: 'We believe that every business deserves access to cutting-edge digital solutions that drive growth, enhance customer experience, and create lasting value.',
        storyPoint1: 'Expert team with 10+ years experience',
        storyPoint2: 'Proven track record of successful projects',
        storyPoint3: 'Cutting-edge technology solutions',
        storyPoint4: 'Dedicated support and maintenance',
        
        // Values Section
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
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async (section, values) => {
    try {
      await api.put('/content', { section, content: values });
      message.success(`${section} content updated successfully`);
    } catch (error) {
      message.error(`Failed to update ${section} content`);
    }
  };

  return (
    <div>
      <Title level={2}>Content Management</Title>
      
      <Tabs 
        defaultActiveKey="home" 
        type="card"
        items={[
          {
            key: 'home',
            label: 'Home Page',
            children: (
          <Card>
            <Form
              form={homeForm}
              layout="vertical"
              onFinish={(values) => handleSaveContent('home', values)}
            >
              <Title level={4}>Hero Section</Title>
              <Text type="secondary">Main hero section content that appears first on the homepage</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="heroMainTitle"
                    label="Main Title (First Line)"
                    rules={[{ required: true, message: 'Please enter main title' }]}
                  >
                    <Input placeholder="Transform Your Business with" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="heroHighlightTitle"
                    label="Highlight Title (Second Line)"
                    rules={[{ required: true, message: 'Please enter highlight title' }]}
                  >
                    <Input placeholder="Digital Excellence" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="heroSubtitle"
                label="Hero Subtitle"
                rules={[{ required: true, message: 'Please enter hero subtitle' }]}
              >
                <TextArea rows={3} placeholder="We help businesses grow through innovative web development..." />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="heroBadgeText"
                    label="Trust Badge Text"
                  >
                    <Input placeholder="Trusted by 500+ Businesses Worldwide" />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={5}>Hero Benefits (Key Points)</Title>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="heroBenefit1" label="Benefit 1">
                    <Input placeholder="Custom Web Development & Design" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="heroBenefit2" label="Benefit 2">
                    <Input placeholder="Data-Driven Digital Marketing" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="heroBenefit3" label="Benefit 3">
                    <Input placeholder="Strategic Business Consulting" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="heroCTAButton" label="Primary CTA Button">
                    <Input placeholder="Get Started Today" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="heroSecondaryButton" label="Secondary Button">
                    <Input placeholder="Watch Demo" />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={4}>Statistics Section</Title>
              <Text type="secondary">Company statistics displayed below hero section</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="stat1Number" label="Stat 1 Number">
                    <Input placeholder="500+" />
                  </Form.Item>
                  <Form.Item name="stat1Label" label="Stat 1 Label">
                    <Input placeholder="Happy Clients" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="stat2Number" label="Stat 2 Number">
                    <Input placeholder="1000+" />
                  </Form.Item>
                  <Form.Item name="stat2Label" label="Stat 2 Label">
                    <Input placeholder="Projects Completed" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="stat3Number" label="Stat 3 Number">
                    <Input placeholder="10+" />
                  </Form.Item>
                  <Form.Item name="stat3Label" label="Stat 3 Label">
                    <Input placeholder="Years Experience" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="stat4Number" label="Stat 4 Number">
                    <Input placeholder="99%" />
                  </Form.Item>
                  <Form.Item name="stat4Label" label="Stat 4 Label">
                    <Input placeholder="Client Satisfaction" />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={4}>Section Titles</Title>
              <Text type="secondary">Titles for various sections on the homepage</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="servicesTitle" label="Services Section Title">
                    <Input placeholder="Our Services" />
                  </Form.Item>
                  <Form.Item name="servicesSubtitle" label="Services Section Subtitle">
                    <Input placeholder="Comprehensive digital solutions to grow your business" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="portfolioTitle" label="Portfolio Section Title">
                    <Input placeholder="Our Work" />
                  </Form.Item>
                  <Form.Item name="portfolioSubtitle" label="Portfolio Section Subtitle">
                    <Input placeholder="Recent projects that showcase our expertise" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="testimonialsTitle" label="Testimonials Section Title">
                    <Input placeholder="What Our Clients Say" />
                  </Form.Item>
                  <Form.Item name="testimonialsSubtitle" label="Testimonials Section Subtitle">
                    <Input placeholder="Real feedback from satisfied customers" />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={4}>Call-to-Action Section</Title>
              <Text type="secondary">Final CTA section at the bottom of homepage</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="ctaTitle" label="CTA Title">
                    <Input placeholder="Ready to Transform Your Business?" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="ctaButtonText" label="CTA Button Text">
                    <Input placeholder="Start Your Project" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="ctaSubtitle" label="CTA Subtitle">
                <TextArea rows={2} placeholder="Let's discuss your project and create something amazing together." />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
                  Save Home Content
                </Button>
              </Form.Item>
            </Form>
          </Card>
            )
          },
          {
            key: 'about',
            label: 'About Page',
            children: (
          <Card>
            <Form
              form={aboutForm}
              layout="vertical"
              onFinish={(values) => handleSaveContent('about', values)}
            >
              <Title level={4}>Hero Section</Title>
              <Text type="secondary">About page hero section content</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="heroTitle"
                    label="Hero Title"
                    rules={[{ required: true, message: 'Please enter hero title' }]}
                  >
                    <Input placeholder="About Roof Biz Solutions" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="heroBadgeText"
                    label="Hero Badge Text"
                  >
                    <Input placeholder="Trusted Digital Partner Since 2014" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="heroSubtitle"
                label="Hero Subtitle"
                rules={[{ required: true, message: 'Please enter hero subtitle' }]}
              >
                <TextArea rows={3} placeholder="We're a team of passionate professionals dedicated to transforming businesses..." />
              </Form.Item>

              <Title level={4}>Statistics Section</Title>
              <Text type="secondary">Company statistics (can be same as home or different)</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="stat1Number" label="Stat 1 Number">
                    <Input placeholder="500+" />
                  </Form.Item>
                  <Form.Item name="stat1Label" label="Stat 1 Label">
                    <Input placeholder="Happy Clients" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="stat2Number" label="Stat 2 Number">
                    <Input placeholder="1000+" />
                  </Form.Item>
                  <Form.Item name="stat2Label" label="Stat 2 Label">
                    <Input placeholder="Projects Completed" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="stat3Number" label="Stat 3 Number">
                    <Input placeholder="10+" />
                  </Form.Item>
                  <Form.Item name="stat3Label" label="Stat 3 Label">
                    <Input placeholder="Years Experience" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="stat4Number" label="Stat 4 Number">
                    <Input placeholder="99%" />
                  </Form.Item>
                  <Form.Item name="stat4Label" label="Stat 4 Label">
                    <Input placeholder="Client Satisfaction" />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={4}>Our Story Section</Title>
              <Text type="secondary">Company story and background</Text>
              <Divider />
              
              <Form.Item name="storyTitle" label="Story Section Title">
                <Input placeholder="Our Story" />
              </Form.Item>

              <Form.Item name="storyDescription1" label="Story Description (Paragraph 1)">
                <TextArea rows={3} placeholder="Founded with a vision to bridge the gap between innovative technology..." />
              </Form.Item>

              <Form.Item name="storyDescription2" label="Story Description (Paragraph 2)">
                <TextArea rows={3} placeholder="We believe that every business deserves access to cutting-edge digital solutions..." />
              </Form.Item>

              <Title level={5}>Story Key Points</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="storyPoint1" label="Key Point 1">
                    <Input placeholder="Expert team with 10+ years experience" />
                  </Form.Item>
                  <Form.Item name="storyPoint2" label="Key Point 2">
                    <Input placeholder="Proven track record of successful projects" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="storyPoint3" label="Key Point 3">
                    <Input placeholder="Cutting-edge technology solutions" />
                  </Form.Item>
                  <Form.Item name="storyPoint4" label="Key Point 4">
                    <Input placeholder="Dedicated support and maintenance" />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={4}>Core Values Section</Title>
              <Text type="secondary">Company values and principles</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="valuesTitle" label="Values Section Title">
                    <Input placeholder="Our Core Values" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="valuesSubtitle" label="Values Section Subtitle">
                    <Input placeholder="The principles that guide everything we do" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="value1Title" label="Value 1 Title">
                    <Input placeholder="Trust & Reliability" />
                  </Form.Item>
                  <Form.Item name="value1Description" label="Value 1 Description">
                    <TextArea rows={2} placeholder="We build lasting relationships through transparent communication..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="value2Title" label="Value 2 Title">
                    <Input placeholder="Innovation First" />
                  </Form.Item>
                  <Form.Item name="value2Description" label="Value 2 Description">
                    <TextArea rows={2} placeholder="We stay ahead of technology trends to provide cutting-edge solutions..." />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="value3Title" label="Value 3 Title">
                    <Input placeholder="Results Driven" />
                  </Form.Item>
                  <Form.Item name="value3Description" label="Value 3 Description">
                    <TextArea rows={2} placeholder="Every project is measured by its impact on your business growth..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="value4Title" label="Value 4 Title">
                    <Input placeholder="Client Focused" />
                  </Form.Item>
                  <Form.Item name="value4Description" label="Value 4 Description">
                    <TextArea rows={2} placeholder="Your success is our success. We work as an extension of your team..." />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
                  Save About Content
                </Button>
              </Form.Item>
            </Form>
          </Card>
            )
          },
          {
            key: 'contact',
            label: 'Contact Page',
            children: (
          <Card>
            <Form
              form={contactForm}
              layout="vertical"
              onFinish={(values) => handleSaveContent('contact', values)}
            >
              <Title level={4}>Hero Section</Title>
              <Text type="secondary">Contact page hero section content</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="heroTitle"
                    label="Hero Title"
                    rules={[{ required: true, message: 'Please enter hero title' }]}
                  >
                    <Input placeholder="Get In Touch" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="heroBadgeText"
                    label="Hero Badge Text"
                  >
                    <Input placeholder="Let's Start a Conversation" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="heroSubtitle"
                label="Hero Subtitle"
                rules={[{ required: true, message: 'Please enter hero subtitle' }]}
              >
                <TextArea rows={2} placeholder="Ready to transform your business? Let's discuss your project..." />
              </Form.Item>

              <Title level={4}>Contact Form Section</Title>
              <Text type="secondary">Contact form area content</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="formTitle" label="Form Title">
                    <Input placeholder="Send us a message" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="formSubtitle" label="Form Subtitle">
                <TextArea rows={2} placeholder="Fill out the form below and we'll get back to you within 24 hours." />
              </Form.Item>

              <Title level={4}>Contact Info Section</Title>
              <Text type="secondary">Contact information sidebar content</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="contactTitle" label="Contact Info Title">
                    <Input placeholder="Let's Connect" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="responseTime" label="Response Time Badge">
                    <Input placeholder="Average response time: 2 hours" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="contactDescription" label="Contact Info Description">
                <TextArea rows={3} placeholder="We'd love to hear from you. Choose the most convenient way to get in touch..." />
              </Form.Item>

              <Title level={4}>Contact Details</Title>
              <Text type="secondary">Actual contact information</Text>
              <Divider />
              
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="email" label="Email Address">
                    <Input placeholder="info@roofbizsolutions.com" />
                  </Form.Item>
                  <Form.Item name="emailDescription" label="Email Description">
                    <Input placeholder="Send us an email anytime" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="phone" label="Phone Number">
                    <Input placeholder="+1 (234) 567-890" />
                  </Form.Item>
                  <Form.Item name="phoneDescription" label="Phone Description">
                    <Input placeholder="Mon-Fri from 8am to 5pm" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="address" label="Office Address">
                    <Input placeholder="123 Business St, City, State 12345" />
                  </Form.Item>
                  <Form.Item name="addressDescription" label="Address Description">
                    <Input placeholder="Visit us for a coffee chat" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
                  Save Contact Content
                </Button>
              </Form.Item>
            </Form>
          </Card>
            )
          }
        ]}
      />
    </div>
  );
};

export default ContentManager;