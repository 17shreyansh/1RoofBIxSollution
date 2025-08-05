import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Megaphone, Palette, ShoppingCart, Smartphone, Users, Star, CheckCircle } from 'lucide-react';
import api from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([
    { 
      _id: '1', 
      name: 'Web Development', 
      description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience', 
      slug: 'web-development',
      icon: Code,
      features: ['Responsive Design', 'Modern Frameworks', 'SEO Optimized', 'Fast Loading'],
      price: 'Starting at $2,999'
    },
    { 
      _id: '2', 
      name: 'Digital Marketing', 
      description: 'Comprehensive digital marketing strategies including SEO, PPC, social media, and content marketing', 
      slug: 'digital-marketing',
      icon: Megaphone,
      features: ['SEO Optimization', 'PPC Campaigns', 'Social Media', 'Analytics'],
      price: 'Starting at $1,499/mo'
    },
    { 
      _id: '3', 
      name: 'Brand Design', 
      description: 'Complete brand identity design including logos, visual guidelines, and marketing materials', 
      slug: 'brand-design',
      icon: Palette,
      features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Visual Identity'],
      price: 'Starting at $1,999'
    },
    { 
      _id: '4', 
      name: 'E-commerce Solutions', 
      description: 'Full-featured online stores with payment integration, inventory management, and optimization', 
      slug: 'ecommerce',
      icon: ShoppingCart,
      features: ['Payment Integration', 'Inventory Management', 'Mobile Optimized', 'Analytics'],
      price: 'Starting at $4,999'
    },
    { 
      _id: '5', 
      name: 'Mobile App Development', 
      description: 'Native and cross-platform mobile applications for iOS and Android with modern features', 
      slug: 'mobile-apps',
      icon: Smartphone,
      features: ['iOS & Android', 'Cross-Platform', 'API Integration', 'App Store Deployment'],
      price: 'Starting at $7,999'
    },
    { 
      _id: '6', 
      name: 'Business Consulting', 
      description: 'Strategic technology consulting to help businesses optimize their digital transformation journey', 
      slug: 'consulting',
      icon: Users,
      features: ['Strategy Planning', 'Technology Audit', 'Process Optimization', 'Growth Planning'],
      price: 'Starting at $199/hr'
    }
  ]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      if (response.data?.length) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        paddingTop: 'calc(140px + 6rem)',
        paddingBottom: '6rem',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: 'white',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
          `,
          opacity: 0.8
        }} />
        
        <Container style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '50px',
                  padding: '0.75rem 1.25rem',
                  marginBottom: '2rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Star size={16} style={{ marginRight: '0.5rem', color: '#fbbf24', fill: '#fbbf24' }} />
                Premium Digital Solutions
              </motion.div>
              
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '900',
                marginBottom: '1.5rem',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.1'
              }}>
                Our 
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Services
                </span>
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Comprehensive digital solutions designed to transform your business and drive measurable growth.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              color: '#1f2937',
              fontFamily: 'Poppins, sans-serif'
            }}>What We Offer</h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Choose from our comprehensive range of digital services</p>
          </motion.div>
          
          <Row>
            {services.map((service, index) => {
              const IconComponent = service.icon || Code;
              return (
                <Col key={service._id} md={6} lg={4} className="mb-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{ height: '100%' }}
                  >
                    <Card style={{
                      height: '100%',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '2rem',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      background: 'white'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                      }}>
                        <IconComponent size={32} color="white" />
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <h3 style={{
                          fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '0'
                        }}>
                          {service.name}
                        </h3>
                        <span style={{
                          fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                          fontWeight: '600',
                          color: '#3b82f6',
                          background: 'rgba(59, 130, 246, 0.1)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px'
                        }}>
                          {service.price || 'Contact for pricing'}
                        </span>
                      </div>
                      
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '1.5rem',
                        lineHeight: '1.6',
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                      }}>
                        {service.description}
                      </p>
                      
                      {/* Features List */}
                      <div style={{ marginBottom: '2rem' }}>
                        {(service.features || ['Professional Service', 'Expert Support', 'Quality Guaranteed']).map((feature, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '0.5rem',
                            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                            color: '#374151'
                          }}>
                            <CheckCircle size={16} style={{
                              marginRight: '0.5rem',
                              color: '#10b981',
                              flexShrink: 0
                            }} />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        as={Link}
                        to={`/services/${service.slug}`}
                        style={{
                          width: '100%',
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '600',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Learn More
                        <ArrowRight size={16} />
                      </Button>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        color: 'white'
      }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              fontFamily: 'Poppins, sans-serif'
            }}>Ready to Get Started?</h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>Let's discuss your project and create something amazing together.</p>
            <Button
              as={Link}
              to="/contact"
              size="lg"
              style={{
                background: 'white',
                color: '#3b82f6',
                border: 'none',
                borderRadius: '50px',
                padding: '1rem 2.5rem',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Start Your Project
              <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Services;