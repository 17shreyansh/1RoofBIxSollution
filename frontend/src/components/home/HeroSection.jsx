import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, Play, CheckCircle, Star, Users, Award, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectionStyle = {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    color: 'white',
    paddingTop: isMobile ? '120px' : '160px',
    paddingBottom: '3rem',
    paddingLeft: isMobile ? '1rem' : '0',
    paddingRight: isMobile ? '1rem' : '0'
  };

  const floatingShapes = [
    { size: 60, x: '10%', y: '20%', delay: 0 },
    { size: 80, x: '85%', y: '15%', delay: 0.5 },
    { size: 40, x: '15%', y: '80%', delay: 1 },
    { size: 100, x: '80%', y: '75%', delay: 1.5 },
    { size: 50, x: '50%', y: '10%', delay: 2 },
  ];

  return (
    <section style={sectionStyle}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)
        `,
        opacity: 0.8
      }} />

      {/* Floating Geometric Shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))`,
            borderRadius: index % 2 === 0 ? '50%' : '20%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <Container style={{ position: 'relative', zIndex: 10 }}>
        <Row className="align-items-center">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Trust Badge */}
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
                Trusted by 500+ Businesses Worldwide
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: '900',
                  lineHeight: '1.1',
                  marginBottom: '1.5rem',
                  fontFamily: 'Poppins, sans-serif'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Transform Your Business with
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                  marginTop: '0.5rem'
                }}>
                  Digital Excellence
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  maxWidth: '500px'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                We help businesses grow through innovative web development, digital marketing, and strategic consulting solutions that deliver measurable results.
              </motion.p>

              {/* Key Benefits */}
              <motion.div
                style={{ marginBottom: '2.5rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                {[
                  'Custom Web Development & Design',
                  'Data-Driven Digital Marketing',
                  'Strategic Business Consulting'
                ].map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: '500'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <CheckCircle size={20} style={{ 
                      marginRight: '0.75rem', 
                      color: '#10b981',
                      flexShrink: 0
                    }} />
                    {benefit}
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="d-flex flex-column flex-sm-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                style={{
                  flexDirection: window.innerWidth <= 576 ? 'column' : 'row',
                  gap: window.innerWidth <= 576 ? '1rem' : '0.75rem'
                }}
              >
                <Button
                  as={Link}
                  to="/contact"
                  size="lg"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: '600',
                    fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '280px'
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
                  Get Started Today
                  <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </Button>

                <Button
                  variant="outline-light"
                  size="lg"
                  style={{
                    borderRadius: '50px',
                    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: '600',
                    fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    width: '100%',
                    maxWidth: '280px'
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
                  <Play size={18} style={{ marginRight: '0.5rem' }} />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'relative' }}
            >
              {/* Interactive Dashboard */}
              <div style={{ position: 'relative', height: '500px' }}>
                {/* Main Dashboard Card */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '420px',
                    height: '320px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '2rem',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <TrendingUp size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white', fontWeight: '700' }}>
                      Business Growth Analytics
                    </h3>
                    <div style={{ 
                      fontSize: '3.5rem', 
                      fontWeight: '900', 
                      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '0.5rem'
                    }}>
                      +250%
                    </div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '1.1rem' }}>
                      Average ROI Increase
                    </p>
                  </div>
                </motion.div>

                {/* Floating Stats Cards */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    minWidth: '140px',
                    textAlign: 'center'
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <Users size={28} style={{ color: '#10b981', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '1.75rem', fontWeight: '900', color: 'white', marginBottom: '0.25rem' }}>500+</div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>
                    Happy Clients
                  </div>
                </motion.div>

                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    minWidth: '140px',
                    textAlign: 'center'
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeInOut"
                  }}
                >
                  <Award size={28} style={{ color: '#8b5cf6', marginBottom: '0.75rem' }} />
                  <div style={{ fontSize: '1.75rem', fontWeight: '900', color: 'white', marginBottom: '0.25rem' }}>98%</div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>
                    Success Rate
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.875rem',
            fontWeight: '600',
            letterSpacing: '0.1em',
            cursor: 'pointer'
          }}
        >
          SCROLL TO EXPLORE
          <div style={{
            width: '2px',
            height: '30px',
            background: 'rgba(255, 255, 255, 0.3)',
            margin: '0.75rem auto',
            borderRadius: '1px',
            position: 'relative'
          }}>
            <motion.div
              style={{
                width: '100%',
                height: '8px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '1px'
              }}
              animate={{ y: [0, 22, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;