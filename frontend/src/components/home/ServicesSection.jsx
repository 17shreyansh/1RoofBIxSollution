import { Link } from 'react-router-dom';
import { ArrowRight, Code, Megaphone, Palette, ShoppingCart, Smartphone, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ServicesSection = ({ services }) => {
  const serviceIcons = {
    'Web Development': { icon: Code, gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
    'Digital Marketing': { icon: Megaphone, gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
    'Brand Design': { icon: Palette, gradient: 'linear-gradient(135deg, #f97316, #ef4444)' },
    'E-commerce': { icon: ShoppingCart, gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    'Mobile Apps': { icon: Smartphone, gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
    'Consulting': { icon: Lightbulb, gradient: 'linear-gradient(135deg, #eab308, #f97316)' }
  };

  const getServiceIcon = (serviceName) => {
    const service = serviceIcons[serviceName];
    return service || { icon: Code, gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' };
  };

  return (
    <section style={{
      minHeight: '100vh',
      padding: '8rem 0 5rem 0',
      background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #eff6ff 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
        `,
        opacity: 0.8
      }} />
      
      <Container style={{ position: 'relative' }}>
        <motion.div
          className="text-center"
          style={{ marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #dbeafe, #e9d5ff)',
              color: '#1d4ed8',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Code size={16} style={{ marginRight: '0.5rem' }} />
            Our Services
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '1.5rem',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #0f172a, #1e40af, #0f172a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Digital Solutions
            </span>
            <br />
            <span style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: '400',
              color: '#64748b'
            }}>
              That Drive Results
            </span>
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '56rem',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            From strategy to execution, we deliver comprehensive digital services that transform businesses and create lasting impact in today's competitive market.
          </p>
        </motion.div>

        <Row>
          {services.map((service, index) => {
            const serviceConfig = getServiceIcon(service.name);
            const IconComponent = serviceConfig.icon;
            
            return (
              <Col key={service._id} md={6} lg={4} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                  style={{ height: '100%' }}
                >
                  <Card style={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
                  }}
                  >
                    {/* Gradient Border Top */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: serviceConfig.gradient
                    }} />

                    <Card.Header style={{ 
                      background: 'transparent',
                      border: 'none',
                      padding: '2rem 2rem 1rem 2rem'
                    }}>
                      {/* Icon */}
                      <motion.div 
                        style={{
                          width: '80px',
                          height: '80px',
                          background: serviceConfig.gradient,
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1.5rem',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent size={36} color="white" />
                      </motion.div>

                      <Card.Title style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '0.75rem',
                        transition: 'color 0.3s ease'
                      }}>
                        {service.name}
                      </Card.Title>
                      
                      <Card.Text style={{
                        color: '#64748b',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        marginBottom: 0
                      }}>
                        {service.description}
                      </Card.Text>
                    </Card.Header>

                    <Card.Body style={{ 
                      padding: '0 2rem 2rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Button 
                        as={Link}
                        to={`/services/${service.slug}`}
                        variant="link"
                        style={{
                          color: '#2563eb',
                          fontWeight: '600',
                          textDecoration: 'none',
                          padding: 0,
                          transition: 'all 0.3s ease',
                          fontSize: '1rem'
                        }}
                        className="d-flex align-items-center"
                        onMouseEnter={(e) => {
                          e.target.style.color = '#1d4ed8';
                          const arrow = e.target.querySelector('svg');
                          if (arrow) arrow.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#2563eb';
                          const arrow = e.target.querySelector('svg');
                          if (arrow) arrow.style.transform = 'translateX(0)';
                        }}
                      >
                        Learn More
                        <ArrowRight size={18} style={{ 
                          marginLeft: '0.5rem', 
                          transition: 'transform 0.3s ease' 
                        }} />
                      </Button>

                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: '#f1f5f9',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}>
                        <ArrowRight size={18} style={{ 
                          color: '#64748b',
                          transition: 'color 0.3s ease'
                        }} />
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          style={{ marginTop: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            as={Link}
            to="/services"
            size="lg"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              border: 'none',
              color: 'white',
              padding: '1rem 3rem',
              borderRadius: '50px',
              boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.background = 'linear-gradient(135deg, #1d4ed8, #6d28d9)';
              e.target.style.boxShadow = '0 15px 40px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
              e.target.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.3)';
            }}
          >
            <Code size={20} style={{ marginRight: '0.75rem' }} />
            Explore All Services
            <ArrowRight size={20} style={{ marginLeft: '0.75rem' }} />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default ServicesSection;