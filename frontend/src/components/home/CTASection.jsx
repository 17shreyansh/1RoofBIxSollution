import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, MessageCircle, Calendar, Phone, Mail } from 'lucide-react';

const CTASection = ({ content = {} }) => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our experts',
      action: 'tel:+1234567890',
      color: '#10b981'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get detailed project information',
      action: 'mailto:info@roofbizsolutions.com',
      color: '#3b82f6'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant support and consultation',
      action: '#',
      color: '#8b5cf6'
    }
  ];

  return (
    <section style={{
      minHeight: '100vh',
      padding: '8rem 0 5rem 0',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
        `,
        opacity: 0.8
      }} />

      {/* Animated Shapes */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
          borderRadius: '50%',
          filter: 'blur(20px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(245, 158, 11, 0.1))',
          borderRadius: '30%',
          filter: 'blur(15px)'
        }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container style={{ position: 'relative', zIndex: 10 }}>
        <Row className="align-items-center">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Calendar size={16} style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
                Ready to Get Started?
              </motion.div>

              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '900',
                marginBottom: '1.5rem',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.1'
              }}>
                {content.ctaTitle || 'Ready to Transform Your Business?'}
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>
                  Today
                </span>
              </h2>

              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2.5rem',
                lineHeight: '1.7',
                maxWidth: '500px'
              }}>
                {content.ctaSubtitle || "Let's discuss your project and create something amazing together."}
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button
                  as={Link}
                  to="/contact"
                  size="lg"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '1rem 2.5rem',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
                  }}
                >
                  Get Free Consultation
                  <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </Button>

                <Button
                  as="a"
                  href="https://wa.me/1234567890"
                  variant="outline-light"
                  size="lg"
                  style={{
                    borderRadius: '50px',
                    padding: '1rem 2.5rem',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#0f172a';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <MessageCircle size={18} style={{ marginRight: '0.5rem' }} />
                  WhatsApp Us
                </Button>
              </div>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Get In Touch
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    return (
                      <motion.a
                        key={index}
                        href={method.action}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '1.25rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '16px',
                          border: `1px solid ${method.color}30`,
                          textDecoration: 'none',
                          color: 'white',
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: `${method.color}10`
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div style={{
                          width: '50px',
                          height: '50px',
                          background: `${method.color}20`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem'
                        }}>
                          <IconComponent size={24} style={{ color: method.color }} />
                        </div>
                        <div>
                          <div style={{
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            marginBottom: '0.25rem'
                          }}>
                            {method.title}
                          </div>
                          <div style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.9rem'
                          }}>
                            {method.description}
                          </div>
                        </div>
                        <ArrowRight 
                          size={20} 
                          style={{ 
                            marginLeft: 'auto',
                            color: method.color,
                            transition: 'transform 0.3s ease'
                          }} 
                        />
                      </motion.a>
                    );
                  })}
                </div>

                {/* Quick Stats */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>24h</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>Response</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>Free</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>Consultation</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#8b5cf6' }}>100%</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTASection;