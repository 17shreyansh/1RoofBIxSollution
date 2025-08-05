import { Star, Quote, Building2, Users2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TestimonialsSection = ({ testimonials }) => {
  const companyTypes = [
    { name: 'Technology', color: '#3b82f6', icon: Building2 },
    { name: 'Startup', color: '#8b5cf6', icon: Users2 },
    { name: 'Enterprise', color: '#10b981', icon: Building2 },
    { name: 'Agency', color: '#f59e0b', icon: MessageSquare },
    { name: 'E-commerce', color: '#ef4444', icon: Building2 }
  ];

  const getCompanyConfig = (index) => {
    return companyTypes[index % companyTypes.length];
  };

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
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)
        `,
        opacity: 0.8
      }} />

      {/* Floating Quote Elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        opacity: 0.05
      }}>
        <Quote size={120} />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        opacity: 0.05,
        transform: 'rotate(180deg)'
      }}>
        <Quote size={100} />
      </div>

      <Container style={{ position: 'relative' }}>
        <motion.div
          className="text-center"
          style={{ marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
              color: '#d97706',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(217, 119, 6, 0.2)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <MessageSquare size={16} style={{ marginRight: '0.5rem' }} />
            Client Testimonials
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '1.5rem',
            fontFamily: 'Poppins, sans-serif'
          }}>
            What Our Clients Say
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '56rem',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Don't just take our word for it. Hear from the businesses we've helped transform their digital presence and achieve remarkable growth.
          </p>
        </motion.div>

        <Row>
          {testimonials.map((testimonial, index) => {
            const companyConfig = getCompanyConfig(index);
            const IconComponent = companyConfig.icon;
            
            return (
              <Col key={testimonial._id} md={6} lg={4} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  style={{ height: '100%' }}
                >
                  <Card style={{
                    height: '100%',
                    border: 'none',
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                  }}
                  >
                    {/* Gradient Border */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(135deg, ${companyConfig.color}, ${companyConfig.color}80)`
                    }} />

                    {/* Quote Icon Background */}
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      width: '50px',
                      height: '50px',
                      background: `${companyConfig.color}10`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.6
                    }}>
                      <Quote size={24} style={{ color: companyConfig.color }} />
                    </div>

                    <Card.Body style={{ padding: '2.5rem' }}>
                      {/* Rating Stars */}
                      <div style={{ 
                        display: 'flex', 
                        marginBottom: '1.5rem',
                        gap: '0.25rem'
                      }}>
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            style={{ 
                              color: '#fbbf24', 
                              fill: '#fbbf24'
                            }} 
                          />
                        ))}
                      </div>

                      {/* Testimonial Content */}
                      <blockquote style={{
                        fontSize: '1.1rem',
                        color: '#374151',
                        lineHeight: '1.7',
                        marginBottom: '2rem',
                        fontStyle: 'italic',
                        position: 'relative',
                        fontWeight: '400'
                      }}>
                        "{testimonial.content}"
                      </blockquote>

                      {/* Client Info */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Avatar */}
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: `linear-gradient(135deg, ${companyConfig.color}15, ${companyConfig.color}25)`,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem',
                          border: `2px solid ${companyConfig.color}20`,
                          position: 'relative'
                        }}>
                          <span style={{
                            fontWeight: '700',
                            fontSize: '1.5rem',
                            color: companyConfig.color
                          }}>
                            {testimonial.name?.charAt(0) || 'C'}
                          </span>
                          
                          {/* Company Icon */}
                          <div style={{
                            position: 'absolute',
                            bottom: '-2px',
                            right: '-2px',
                            width: '20px',
                            height: '20px',
                            background: companyConfig.color,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid white'
                          }}>
                            <IconComponent size={10} color="white" />
                          </div>
                        </div>

                        {/* Client Details */}
                        <div>
                          <div style={{
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            color: '#0f172a',
                            marginBottom: '0.25rem'
                          }}>
                            {testimonial.name}
                          </div>
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#64748b',
                            fontWeight: '500'
                          }}>
                            {testimonial.company}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: companyConfig.color,
                            fontWeight: '600',
                            marginTop: '0.25rem'
                          }}>
                            {companyConfig.name} Sector
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* Trust Indicators */}
        <motion.div
          className="text-center"
          style={{ marginTop: '5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#64748b',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Trusted by Industry Leaders
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              {companyTypes.slice(0, 5).map((company, index) => (
                <motion.div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.5rem',
                    background: `${company.color}08`,
                    borderRadius: '12px',
                    border: `1px solid ${company.color}15`,
                    color: company.color,
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: `${company.color}12`
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <company.icon size={16} style={{ marginRight: '0.5rem' }} />
                  {company.name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;