import { Shield, Zap, Target, Heart, Code, Users2, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';

const StatsSection = () => {
  const capabilities = [
    {
      icon: Shield,
      title: 'Reliable Solutions',
      description: 'Enterprise-grade security and performance standards',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Agile development with rapid deployment cycles',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Strategic approach focused on measurable outcomes',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description: 'Dedicated support throughout your digital journey',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    }
  ];

  const achievements = [
    {
      icon: Users2,
      label: 'Happy Clients',
      value: '500+',
      description: 'Businesses transformed'
    },
    {
      icon: Code,
      label: 'Projects Delivered',
      value: '1000+',
      description: 'Successful launches'
    },
    {
      icon: Award,
      label: 'Success Rate',
      value: '98%',
      description: 'Client satisfaction'
    },
    {
      icon: Clock,
      label: 'Support',
      value: '24/7',
      description: 'Always available'
    }
  ];

  return (
    <section style={{
      minHeight: '100vh',
      padding: '8rem 0 5rem 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
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
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
        `,
        opacity: 0.8
      }} />
      
      <Container style={{ position: 'relative' }}>
        {/* Header */}
        <motion.div 
          className="text-center"
          style={{ marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Why Choose Us
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3rem)',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '1rem',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Our Approach to Excellence
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            We combine strategic thinking with technical expertise to deliver solutions that drive real business growth
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <Row className="mb-5">
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <Col key={index} sm={6} lg={3} className="mb-4">
                <motion.div 
                  style={{
                    textAlign: 'center',
                    padding: '2rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    height: '100%'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  {/* Icon */}
                  <motion.div 
                    style={{
                      width: '70px',
                      height: '70px',
                      background: capability.gradient,
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent size={32} color="white" />
                  </motion.div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '0.75rem'
                  }}>
                    {capability.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {capability.description}
                  </p>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* Achievements Bar */}
        <motion.div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Row>
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Col key={index} sm={6} lg={3} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto'
                    }}>
                      <IconComponent size={24} color="white" />
                    </div>

                    {/* Value */}
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '0.25rem',
                      fontFamily: 'Poppins, sans-serif'
                    }}>
                      {achievement.value}
                    </div>

                    {/* Label */}
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.25rem'
                    }}>
                      {achievement.label}
                    </div>

                    {/* Description */}
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>
                      {achievement.description}
                    </div>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          className="text-center"
          style={{ marginTop: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <p style={{
            fontSize: '1.125rem',
            color: '#475569',
            fontWeight: '500',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Every project is an opportunity to exceed expectations and build lasting partnerships
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsSection;