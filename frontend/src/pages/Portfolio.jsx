import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star, Filter } from 'lucide-react';
import api from '../utils/api';
import { useContent } from '../context/ContentContext';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { content: dynamicContent, loading: contentLoading } = useContent();
  const content = dynamicContent.portfolio || {};

  const categories = ['All', 'Web Development', 'Design', 'Mobile', 'Marketing', 'SEO'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const portfolioRes = await api.get('/portfolio');
      setPortfolio(portfolioRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setPortfolio([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPortfolio = filter === 'All' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  if (loading || contentLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '140px'
      }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading portfolio...</p>
        </div>
      </div>
    );
  }

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
                {content.heroBadgeText || 'Our Best Work'}
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
                }}>Portfolio</span>
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                {content.heroSubtitle || "Showcasing our best work and the success stories we've created for our clients across various industries."}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '2rem 0', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  background: filter === category 
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)' 
                    : '#f3f4f6',
                  color: filter === category ? 'white' : '#374151',
                  boxShadow: filter === category 
                    ? '0 4px 15px rgba(59, 130, 246, 0.4)' 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (filter !== category) {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== category) {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <Container>
          <Row>
            {filteredPortfolio.map((item, index) => (
              <Col key={item._id} md={6} lg={4} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  style={{ height: '100%' }}
                >
                  <Card style={{
                    height: '100%',
                    border: 'none',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    background: 'white'
                  }}>
                    <div style={{
                      position: 'relative',
                      height: '250px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={item.image || '/api/placeholder/600/400'} 
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem'
                      }}>
                        <Badge style={{
                          background: 'rgba(59, 130, 246, 0.9)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {item.category}
                        </Badge>
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        right: '1rem',
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        {item.technologies?.slice(0, 3).map((tech, i) => (
                          <span key={i} style={{
                            padding: '0.25rem 0.75rem',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '15px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#374151'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Card.Body style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        color: '#1f2937',
                        transition: 'color 0.3s ease'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '1.5rem',
                        lineHeight: '1.6',
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                      }}>
                        {item.description}
                      </p>
                      <Button 
                        as={Link}
                        to={`/portfolio/${item.slug}`}
                        style={{
                          width: '100%',
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '600',
                          fontSize: '0.95rem',
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
                        View Details
                        <ExternalLink size={16} />
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
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
            }}>Ready to Start Your Project?</h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>Let's create something amazing together. Get in touch to discuss your next project.</p>
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
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Portfolio;