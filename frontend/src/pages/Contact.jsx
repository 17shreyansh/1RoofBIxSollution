import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send, Star, Clock, MessageCircle } from 'lucide-react';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await api.post('/leads', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
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
                <MessageCircle size={16} style={{ marginRight: '0.5rem', color: '#10b981' }} />
                Let's Start a Conversation
              </motion.div>
              
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '900',
                marginBottom: '1.5rem',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.1'
              }}>
                Get In 
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Touch
                </span>
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Ready to transform your business? Let's discuss your project and create something amazing together.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <Container>
          <Row>
            {/* Contact Form */}
            <Col lg={7} className="mb-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card style={{
                  border: 'none',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  background: 'white'
                }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
                      fontWeight: '700',
                      marginBottom: '0.5rem',
                      color: '#1f2937'
                    }}>Send us a message</h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                    }}>Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                              padding: '0.75rem 1rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '12px',
                              fontSize: '1rem',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3b82f6';
                              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                              padding: '0.75rem 1rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '12px',
                              fontSize: '1rem',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3b82f6';
                              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                              padding: '0.75rem 1rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '12px',
                              fontSize: '1rem',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3b82f6';
                              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Company</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            style={{
                              padding: '0.75rem 1rem',
                              border: '2px solid #e5e7eb',
                              borderRadius: '12px',
                              fontSize: '1rem',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#3b82f6';
                              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label style={{ fontWeight: '600', color: '#374151' }}>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{
                          padding: '0.75rem 1rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '1rem 2rem',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </Button>

                    {submitStatus === 'success' && (
                      <Alert variant="success" style={{
                        marginTop: '1rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#065f46'
                      }}>
                        Message sent successfully! We'll get back to you within 24 hours.
                      </Alert>
                    )}

                    {submitStatus === 'error' && (
                      <Alert variant="danger" style={{
                        marginTop: '1rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#991b1b'
                      }}>
                        Error sending message. Please try again or contact us directly.
                      </Alert>
                    )}
                  </Form>
                </Card>
              </motion.div>
            </Col>

            {/* Contact Info */}
            <Col lg={5}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ paddingLeft: '2rem' }}
              >
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>Let's Connect</h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                    lineHeight: '1.7',
                    marginBottom: '2rem'
                  }}>
                    We'd love to hear from you. Choose the most convenient way to get in touch, and we'll respond promptly.
                  </p>
                  
                  {/* Response Time Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#065f46',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '2rem'
                  }}>
                    <Clock size={16} style={{ marginRight: '0.5rem' }} />
                    Average response time: 2 hours
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {[
                    {
                      icon: Mail,
                      title: 'Email',
                      value: 'info@roofbizsolutions.com',
                      description: 'Send us an email anytime'
                    },
                    {
                      icon: Phone,
                      title: 'Phone',
                      value: '+1 (234) 567-890',
                      description: 'Mon-Fri from 8am to 5pm'
                    },
                    {
                      icon: MapPin,
                      title: 'Office',
                      value: '123 Business St, City, State 12345',
                      description: 'Visit us for a coffee chat'
                    }
                  ].map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          padding: '1.5rem',
                          background: 'white',
                          borderRadius: '16px',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                        }}
                      >
                        <div style={{
                          width: '50px',
                          height: '50px',
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <IconComponent size={24} color="white" />
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                            fontWeight: '600',
                            marginBottom: '0.25rem',
                            color: '#1f2937'
                          }}>
                            {contact.title}
                          </h4>
                          <p style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            fontWeight: '500',
                            color: '#3b82f6',
                            marginBottom: '0.25rem'
                          }}>
                            {contact.value}
                          </p>
                          <p style={{
                            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                            color: '#6b7280',
                            margin: '0'
                          }}>
                            {contact.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;