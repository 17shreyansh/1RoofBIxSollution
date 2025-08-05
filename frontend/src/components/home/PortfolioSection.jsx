import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { ExternalLink, ArrowRight, Code, Palette, Smartphone, TrendingUp, Search, Globe } from 'lucide-react';

const PortfolioSection = ({ portfolio }) => {
  const portfolioCategories = {
    'Web Development': { 
      color: '#3b82f6', 
      icon: Code,
      bgColor: 'rgba(59, 130, 246, 0.1)',
      gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)'
    },
    'Design': { 
      color: '#8b5cf6', 
      icon: Palette,
      bgColor: 'rgba(139, 92, 246, 0.1)',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    'Mobile': { 
      color: '#10b981', 
      icon: Smartphone,
      bgColor: 'rgba(16, 185, 129, 0.1)',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    'Marketing': { 
      color: '#f59e0b', 
      icon: TrendingUp,
      bgColor: 'rgba(245, 158, 11, 0.1)',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    'SEO': { 
      color: '#ef4444', 
      icon: Search,
      bgColor: 'rgba(239, 68, 68, 0.1)',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
    }
  };

  const getCategoryConfig = (category) => {
    return portfolioCategories[category] || {
      color: '#3b82f6',
      icon: Globe,
      bgColor: 'rgba(59, 130, 246, 0.1)',
      gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)'
    };
  };

  return (
    <section style={{
      minHeight: '100vh',
      padding: '8rem 0 5rem 0',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(245, 158, 11, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />

      <Container>
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
              background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
              color: '#374151',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Globe size={16} style={{ marginRight: '0.5rem' }} />
            Our Portfolio
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '1.5rem',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Success Stories
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '56rem',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Discover how we've helped businesses achieve their digital goals and drive measurable results through innovative solutions and strategic partnerships.
          </p>
        </motion.div>

        <Row>
          {portfolio.slice(0, 6).map((item, index) => {
            const categoryConfig = getCategoryConfig(item.category);
            const IconComponent = categoryConfig.icon;
            
            return (
              <Col key={item._id} md={6} lg={4} className="mb-4">
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
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.4s ease',
                    background: 'white',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)';
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.15)';
                    const overlay = e.currentTarget.querySelector('.portfolio-overlay');
                    if (overlay) overlay.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                    const overlay = e.currentTarget.querySelector('.portfolio-overlay');
                    if (overlay) overlay.style.opacity = '0';
                  }}
                  >
                    {/* Project Image/Preview */}
                    <div style={{
                      position: 'relative',
                      height: '220px',
                      background: categoryConfig.gradient,
                      overflow: 'hidden'
                    }}>
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: categoryConfig.gradient
                        }}>
                          <IconComponent size={64} color="rgba(255, 255, 255, 0.8)" />
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div 
                        className="portfolio-overlay"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Button
                          as={Link}
                          to={`/portfolio/${item.slug}`}
                          style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            color: '#0f172a',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '0.875rem 1.75rem',
                            fontWeight: '600',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          <ExternalLink size={16} style={{ marginRight: '0.5rem' }} />
                          View Project
                        </Button>
                      </div>
                    </div>

                    <Card.Body style={{ padding: '2rem' }}>
                      {/* Category Badge */}
                      <Badge
                        style={{
                          background: categoryConfig.bgColor,
                          color: categoryConfig.color,
                          border: `1px solid ${categoryConfig.color}20`,
                          borderRadius: '50px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        <IconComponent size={12} style={{ marginRight: '0.5rem' }} />
                        {item.category}
                      </Badge>

                      {/* Title */}
                      <Card.Title style={{
                        fontSize: '1.375rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '0.75rem',
                        lineHeight: '1.3'
                      }}>
                        {item.title}
                      </Card.Title>

                      {/* Description */}
                      <Card.Text style={{
                        color: '#64748b',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem'
                      }}>
                        {item.description}
                      </Card.Text>

                      {/* Learn More Link */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <Button
                          as={Link}
                          to={`/portfolio/${item.slug}`}
                          variant="link"
                          style={{
                            color: categoryConfig.color,
                            textDecoration: 'none',
                            padding: 0,
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            transition: 'all 0.3s ease'
                          }}
                          className="d-flex align-items-center"
                          onMouseEnter={(e) => {
                            const arrow = e.target.querySelector('svg');
                            if (arrow) arrow.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            const arrow = e.target.querySelector('svg');
                            if (arrow) arrow.style.transform = 'translateX(0)';
                          }}
                        >
                          View Details
                          <ArrowRight size={16} style={{ 
                            marginLeft: '0.5rem', 
                            transition: 'transform 0.3s ease' 
                          }} />
                        </Button>

                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: categoryConfig.bgColor,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <ArrowRight size={16} style={{ color: categoryConfig.color }} />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* View All CTA */}
        <motion.div 
          className="text-center"
          style={{ marginTop: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Button
            as={Link}
            to="/portfolio"
            size="lg"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none',
              borderRadius: '50px',
              padding: '1rem 3rem',
              fontWeight: '600',
              fontSize: '1.1rem',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
            }}
          >
            <Globe size={20} style={{ marginRight: '0.75rem' }} />
            View All Projects
            <ArrowRight size={20} style={{ marginLeft: '0.75rem' }} />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default PortfolioSection;