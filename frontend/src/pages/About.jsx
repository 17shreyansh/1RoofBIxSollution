import { motion } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Users, Award, Target, CheckCircle, Star, TrendingUp, Shield, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects Completed', icon: Award },
    { number: '10+', label: 'Years Experience', icon: Target },
    { number: '99%', label: 'Client Satisfaction', icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'We build lasting relationships through transparent communication and reliable delivery.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We stay ahead of technology trends to provide cutting-edge solutions for our clients.'
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'Every project is measured by its impact on your business growth and success metrics.'
    },
    {
      icon: Users,
      title: 'Client Focused',
      description: 'Your success is our success. We work as an extension of your team to achieve your goals.'
    }
  ];

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
                <Award size={16} style={{ marginRight: '0.5rem', color: '#fbbf24' }} />
                Trusted Digital Partner Since 2014
              </motion.div>
              
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '900',
                marginBottom: '1.5rem',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.1'
              }}>
                About 
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Roof Biz Solutions
                </span>
              </h1>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                We're a team of passionate professionals dedicated to transforming businesses through innovative digital solutions that drive real results.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <Container>
          <Row>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Col key={index} md={6} lg={3} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      textAlign: 'center',
                      padding: '2rem 1rem'
                    }}
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
                      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                    }}>
                      <IconComponent size={32} color="white" />
                    </div>
                    <h3 style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: '900',
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      {stat.number}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      fontWeight: '600',
                      fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)'
                    }}>
                      {stat.label}
                    </p>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: '900',
                  marginBottom: '2rem',
                  color: '#1f2937',
                  fontFamily: 'Poppins, sans-serif'
                }}>Our Story</h2>
                <p style={{
                  color: '#4b5563',
                  marginBottom: '1.5rem',
                  fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                  lineHeight: '1.7'
                }}>
                  Founded with a vision to bridge the gap between innovative technology and business success, 
                  Roof Biz Solutions has been at the forefront of digital transformation for over a decade.
                </p>
                <p style={{
                  color: '#4b5563',
                  marginBottom: '2rem',
                  fontSize: '1.1rem',
                  lineHeight: '1.7'
                }}>
                  We believe that every business deserves access to cutting-edge digital solutions that drive 
                  growth, enhance customer experience, and create lasting value.
                </p>
                
                {/* Key Points */}
                <div>
                  {[
                    'Expert team with 10+ years experience',
                    'Proven track record of successful projects',
                    'Cutting-edge technology solutions',
                    'Dedicated support and maintenance'
                  ].map((point, index) => (
                    <motion.div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        color: '#374151',
                        fontWeight: '500'
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <CheckCircle size={20} style={{ 
                        marginRight: '0.75rem', 
                        color: '#10b981',
                        flexShrink: 0
                      }} />
                      {point}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  height: '400px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} />
                <div style={{ position: 'relative', textAlign: 'center' }}>
                  <Users size={48} style={{ marginBottom: '1rem' }} />
                  <div>Our Amazing Team</div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
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
            }}>Our Core Values</h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>The principles that guide everything we do</p>
          </motion.div>
          
          <Row>
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Col key={index} md={6} lg={3} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card style={{
                      height: '100%',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '2rem 1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                      }}>
                        <IconComponent size={28} color="white" />
                      </div>
                      <h4 style={{
                        fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: '#1f2937'
                      }}>
                        {value.title}
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6',
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                      }}>
                        {value.description}
                      </p>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;