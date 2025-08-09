import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Star, 
  Users, 
  Award, 
  Zap,
  Shield,
  TrendingUp,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import api from '../utils/api';
import { formatPrice } from '../utils/currency';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('standard');



  useEffect(() => {
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/services/${slug}`);
      const serviceData = response.data;
      
      // Add default benefits if not present
      if (!serviceData.benefits) {
        serviceData.benefits = [
          { icon: Zap, title: 'Fast Delivery', description: 'Quick turnaround time with quality results' },
          { icon: Shield, title: 'Reliable', description: 'Dependable service you can trust' },
          { icon: TrendingUp, title: 'Results Driven', description: 'Focused on achieving your business goals' },
          { icon: Users, title: 'Expert Team', description: 'Experienced professionals dedicated to your success' }
        ];
      }
      
      setService(serviceData);
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '140px' }}>
        <Container>
          <div className="text-center">
            <h1>Service Not Found</h1>
            <Link to="/services" className="btn btn-primary">Back to Services</Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        paddingTop: 'calc(140px + 4rem)',
        paddingBottom: '4rem',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/services" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                marginBottom: '2rem',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
              Back to Services
            </Link>
            
            <Row className="align-items-center">
              <Col lg={8}>
                <Badge 
                  bg="primary" 
                  style={{
                    fontSize: '0.875rem',
                    padding: '0.5rem 1rem',
                    marginBottom: '1rem',
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {service.category}
                </Badge>
                
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '900',
                  marginBottom: '1.5rem',
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: '1.1'
                }}>
                  {service.name}
                </h1>
                
                <div style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '2rem',
                  lineHeight: '1.8'
                }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    {service.description}
                  </p>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Our comprehensive approach ensures that every aspect of your project is handled with precision and expertise. We work closely with our clients to understand their unique requirements and deliver solutions that exceed expectations.
                  </p>
                  <p style={{ marginBottom: '0' }}>
                    From initial consultation to final delivery, we maintain transparent communication and provide regular updates on project progress. Our team of experienced professionals is committed to delivering high-quality results on time and within budget.
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.75rem 1rem',
                    borderRadius: '50px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Clock size={16} style={{ marginRight: '0.5rem' }} />
                    {service.deliveryTime}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.75rem 1rem',
                    borderRadius: '50px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Award size={16} style={{ marginRight: '0.5rem' }} />
                    Premium Quality
                  </div>
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Benefits Section */}
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
            }}>Why Choose This Service?</h2>
          </motion.div>
          
          <Row>
            {service.benefits?.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Col key={index} md={6} lg={3} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card style={{
                      border: 'none',
                      borderRadius: '20px',
                      padding: '2rem 1.5rem',
                      height: '100%',
                      textAlign: 'center',
                      background: 'white',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                      }}>
                        <IconComponent size={24} color="white" />
                      </div>
                      <h4 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        color: '#1f2937'
                      }}>
                        {benefit.title}
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}>
                        {benefit.description}
                      </p>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
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
            }}>Choose Your Plan</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Select the perfect package for your needs</p>
          </motion.div>
          
          <Row className="justify-content-center">
            {Object.entries(service.pricing || {}).map(([planType, plan], index) => (
              <Col key={planType} lg={4} md={6} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card style={{
                    border: planType === 'standard' ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '20px',
                    padding: '2rem',
                    height: '100%',
                    position: 'relative',
                    background: 'white',
                    boxShadow: planType === 'standard' ? '0 20px 40px rgba(59, 130, 246, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.08)'
                  }}>
                    {planType === 'standard' && (
                      <Badge 
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        Most Popular
                      </Badge>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        color: '#1f2937',
                        textTransform: 'capitalize'
                      }}>
                        {planType}
                      </h3>
                      <div style={{
                        fontSize: '3rem',
                        fontWeight: '900',
                        color: '#3b82f6',
                        marginBottom: '0.5rem'
                      }}>
                        {formatPrice(plan.price)}
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        One-time payment
                      </p>
                    </div>
                    
                    <div style={{ marginBottom: '2rem' }}>
                      {plan.features?.map((feature, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '0.75rem',
                          fontSize: '0.95rem',
                          color: '#374151'
                        }}>
                          <CheckCircle size={16} style={{
                            marginRight: '0.75rem',
                            color: '#10b981',
                            flexShrink: 0
                          }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      style={{
                        width: '100%',
                        background: planType === 'standard' 
                          ? 'linear-gradient(135deg, #3b82f6, #2563eb)' 
                          : 'transparent',
                        color: planType === 'standard' ? 'white' : '#3b82f6',
                        border: planType === 'standard' ? 'none' : '2px solid #3b82f6',
                        borderRadius: '12px',
                        padding: '0.875rem 1.5rem',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (planType !== 'standard') {
                          e.target.style.background = '#3b82f6';
                          e.target.style.color = 'white';
                        }
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        if (planType !== 'standard') {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#3b82f6';
                        }
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      Get Started
                    </Button>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Technologies Section */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
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
            }}>Technologies We Use</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Modern tools and frameworks for optimal results</p>
          </motion.div>
          
          <Row className="justify-content-center">
            {service.technologies?.map((tech, index) => (
              <Col key={index} xs={6} md={4} lg={2} className="mb-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '15px',
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {tech}
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>



      {/* Process Section */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
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
            }}>Our Process</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>How we deliver exceptional results</p>
          </motion.div>
          
          <Row>
            {service.process?.map((step, index) => (
              <Col key={index} md={6} lg={3} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    color: 'white',
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                  }}>
                    {step.step}
                  </div>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '0.75rem',
                    color: '#1f2937'
                  }}>
                    {step.title}
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    {step.description}
                  </p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      {service.testimonials && (
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
              }}>What Our Clients Say</h2>
            </motion.div>
            
            <Row className="justify-content-center">
              {service.testimonials.map((testimonial, index) => (
                <Col key={index} md={6} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card style={{
                      border: 'none',
                      borderRadius: '20px',
                      padding: '2rem',
                      height: '100%',
                      background: 'white',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} style={{ color: '#fbbf24', fill: '#fbbf24', marginRight: '2px' }} />
                        ))}
                      </div>
                      <p style={{
                        fontSize: '1.1rem',
                        color: '#374151',
                        marginBottom: '1.5rem',
                        lineHeight: '1.7',
                        fontStyle: 'italic'
                      }}>
                        "{testimonial.text}"
                      </p>
                      <div>
                        <h6 style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '0.25rem'
                        }}>
                          {testimonial.name}
                        </h6>
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          marginBottom: '0'
                        }}>
                          {testimonial.company}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqs && (
        <section style={{ padding: '5rem 0', background: 'white' }}>
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
              }}>Frequently Asked Questions</h2>
            </motion.div>
            
            <Row className="justify-content-center">
              <Col lg={8}>
                {service.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{ marginBottom: '2rem' }}
                  >
                    <Card style={{
                      border: 'none',
                      borderRadius: '15px',
                      background: '#f8fafc',
                      padding: '1.5rem'
                    }}>
                      <h5 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '1rem'
                      }}>
                        {faq.question}
                      </h5>
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '0',
                        lineHeight: '1.7'
                      }}>
                        {faq.answer}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </Col>
            </Row>
          </Container>
        </section>
      )}

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
            }}>Ready to Start Your Project?</h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>Let's discuss your requirements and create something amazing together.</p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Get Started
                <ArrowRight size={20} />
              </Button>
              
              <Button
                variant="outline-light"
                size="lg"
                style={{
                  borderRadius: '50px',
                  padding: '1rem 2.5rem',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MessageCircle size={20} />
                Chat with Us
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default ServiceDetail;