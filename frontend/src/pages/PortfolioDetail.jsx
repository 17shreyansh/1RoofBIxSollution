import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  User, 
  Globe,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import api from '../utils/api';

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Comprehensive mock data
  const mockProjects = {
    'ecommerce-platform': {
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A comprehensive e-commerce solution built for a growing retail business. The platform features advanced inventory management, multiple payment gateways, and a responsive design that works seamlessly across all devices.',
      shortDescription: 'Modern online store with advanced features',
      image: '/api/placeholder/1200/600',
      gallery: [
        '/api/placeholder/800/500',
        '/api/placeholder/800/500',
        '/api/placeholder/800/500',
        '/api/placeholder/800/500'
      ],
      category: 'Web Development',
      services: ['Web Development', 'E-commerce', 'UI/UX Design'],
      client: {
        name: 'RetailMax Solutions',
        logo: '/api/placeholder/200/100',
        website: 'https://retailmax.com'
      },
      projectUrl: 'https://demo-ecommerce.com',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redux'],
      duration: '3 months',
      completedDate: 'March 2024',
      results: {
        metrics: [
          { label: 'Sales Increase', value: '250%', improvement: '+150%' },
          { label: 'Page Load Speed', value: '1.2s', improvement: '60% faster' },
          { label: 'Mobile Conversion', value: '8.5%', improvement: '+200%' },
          { label: 'User Engagement', value: '4.2 min', improvement: '+180%' }
        ],
        testimonial: 'The new platform exceeded our expectations. Sales have tripled since launch!'
      },
      challenges: [
        'Complex inventory management system',
        'Multiple payment gateway integration',
        'Real-time order tracking',
        'Mobile-first responsive design'
      ],
      solutions: [
        'Custom inventory API with real-time updates',
        'Unified payment processing system',
        'WebSocket-based live tracking',
        'Progressive Web App architecture'
      ],
      features: [
        'Advanced product catalog',
        'Multi-vendor support',
        'Real-time inventory tracking',
        'Secure payment processing',
        'Order management system',
        'Customer analytics dashboard',
        'Mobile-responsive design',
        'SEO optimization'
      ]
    },
    'brand-identity': {
      title: 'Brand Identity Design',
      slug: 'brand-identity',
      description: 'Complete brand transformation for a tech startup, including logo design, brand guidelines, marketing materials, and digital assets. The project focused on creating a modern, professional identity that resonates with their target audience.',
      shortDescription: 'Complete brand redesign and visual identity',
      image: '/api/placeholder/1200/600',
      gallery: [
        '/api/placeholder/800/500',
        '/api/placeholder/800/500',
        '/api/placeholder/800/500',
        '/api/placeholder/800/500'
      ],
      category: 'Design',
      services: ['Brand Design', 'Logo Design', 'Marketing Materials'],
      client: {
        name: 'TechVision Startup',
        logo: '/api/placeholder/200/100',
        website: 'https://techvision.com'
      },
      projectUrl: null,
      technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign'],
      duration: '6 weeks',
      completedDate: 'February 2024',
      results: {
        metrics: [
          { label: 'Brand Recognition', value: '85%', improvement: '+300%' },
          { label: 'Customer Trust', value: '92%', improvement: '+180%' },
          { label: 'Market Position', value: 'Top 10', improvement: 'From unranked' },
          { label: 'Social Engagement', value: '450%', improvement: '+350%' }
        ],
        testimonial: 'Our new brand identity perfectly captures our vision and has significantly improved our market presence.'
      },
      challenges: [
        'Outdated visual identity',
        'Inconsistent brand messaging',
        'Limited market recognition',
        'Competitive differentiation'
      ],
      solutions: [
        'Modern, scalable logo design',
        'Comprehensive brand guidelines',
        'Consistent visual language',
        'Unique brand positioning strategy'
      ],
      features: [
        'Logo design and variations',
        'Brand color palette',
        'Typography system',
        'Brand guidelines document',
        'Business card design',
        'Letterhead and stationery',
        'Social media templates',
        'Website design elements'
      ]
    },
    'mobile-app': {
      title: 'Mobile Banking App',
      slug: 'mobile-app',
      description: 'A secure and user-friendly mobile banking application with advanced features like biometric authentication, real-time transactions, and comprehensive financial management tools.',
      shortDescription: 'Secure and user-friendly banking application',
      image: '/api/placeholder/1200/600',
      gallery: [
        '/api/placeholder/800/500',
        '/api/placeholder/800/500',
        '/api/placeholder/800/500',
        '/api/placeholder/800/500'
      ],
      category: 'Mobile',
      services: ['Mobile Development', 'UI/UX Design', 'Security'],
      client: {
        name: 'SecureBank Corp',
        logo: '/api/placeholder/200/100',
        website: 'https://securebank.com'
      },
      projectUrl: null,
      technologies: ['React Native', 'Firebase', 'Stripe', 'Biometric API', 'Redux'],
      duration: '4 months',
      completedDate: 'April 2024',
      results: {
        metrics: [
          { label: 'App Store Rating', value: '4.8/5', improvement: 'New app' },
          { label: 'Daily Active Users', value: '25K+', improvement: 'New metric' },
          { label: 'Transaction Success', value: '99.9%', improvement: 'Industry leading' },
          { label: 'User Satisfaction', value: '94%', improvement: 'Excellent' }
        ],
        testimonial: 'The app has revolutionized how our customers interact with our banking services.'
      },
      challenges: [
        'High security requirements',
        'Complex financial regulations',
        'Cross-platform compatibility',
        'Real-time transaction processing'
      ],
      solutions: [
        'Multi-layer security architecture',
        'Compliance-first development',
        'React Native framework',
        'Real-time API integration'
      ],
      features: [
        'Biometric authentication',
        'Real-time balance updates',
        'Secure money transfers',
        'Bill payment system',
        'Transaction history',
        'Budget tracking tools',
        'Push notifications',
        'Customer support chat'
      ]
    }
  };

  const mockProject = mockProjects[slug] || mockProjects['ecommerce-platform'];

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      // For now, use mock data
      setProject(mockProject);
    } catch (error) {
      console.error('Error fetching project:', error);
      setProject(mockProject);
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
        justifyContent: 'center',
        paddingTop: '140px'
      }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '140px' }}>
        <Container>
          <div className="text-center">
            <h1>Project Not Found</h1>
            <Link to="/portfolio" className="btn btn-primary">Back to Portfolio</Link>
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
              to="/portfolio" 
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
              Back to Portfolio
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
                  {project.category}
                </Badge>
                
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '900',
                  marginBottom: '1.5rem',
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: '1.1'
                }}>
                  {project.title}
                </h1>
                
                <p style={{
                  fontSize: '1.25rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '2rem',
                  lineHeight: '1.7'
                }}>
                  {project.description}
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.75rem 1rem',
                    borderRadius: '50px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Calendar size={16} style={{ marginRight: '0.5rem' }} />
                    {project.completedDate}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.75rem 1rem',
                    borderRadius: '50px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <User size={16} style={{ marginRight: '0.5rem' }} />
                    {project.client.name}
                  </div>
                </div>
                
                {project.projectUrl && (
                  <Button
                    href={project.projectUrl}
                    target="_blank"
                    style={{
                      background: 'white',
                      color: '#3b82f6',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '1rem 2rem',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: 'fit-content'
                    }}
                  >
                    <Globe size={18} />
                    View Live Project
                  </Button>
                )}
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Project Image */}
      <section style={{ padding: '0', background: 'white' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              marginTop: '-2rem',
              position: 'relative',
              zIndex: 10
            }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        </Container>
      </section>

      {/* Results Section */}
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
            }}>Project Results</h2>
          </motion.div>
          
          <Row className="mb-5">
            {project.results?.metrics?.map((metric, index) => (
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
                      fontSize: '2.5rem',
                      fontWeight: '900',
                      color: '#3b82f6',
                      marginBottom: '0.5rem'
                    }}>
                      {metric.value}
                    </div>
                    <h5 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      marginBottom: '0.5rem',
                      color: '#1f2937'
                    }}>
                      {metric.label}
                    </h5>
                    <p style={{
                      color: '#10b981',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0'
                    }}>
                      {metric.improvement}
                    </p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          
          {project.results?.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card style={{
                border: 'none',
                borderRadius: '20px',
                padding: '3rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} style={{ color: '#fbbf24', fill: '#fbbf24', marginRight: '4px' }} />
                  ))}
                </div>
                <p style={{
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                  marginBottom: '1rem',
                  lineHeight: '1.7'
                }}>
                  "{project.results.testimonial}"
                </p>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0'
                }}>
                  - {project.client.name}
                </p>
              </Card>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Technologies & Features */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <Container>
          <Row>
            <Col lg={6} className="mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  marginBottom: '2rem',
                  color: '#1f2937'
                }}>Technologies Used</h3>
                <Row>
                  {project.technologies?.map((tech, index) => (
                    <Col key={index} xs={6} md={4} className="mb-3">
                      <div style={{
                        background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '15px',
                        padding: '1rem',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {tech}
                      </div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Col>
            
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  marginBottom: '2rem',
                  color: '#1f2937'
                }}>Key Features</h3>
                <div>
                  {project.features?.map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      fontSize: '1rem',
                      color: '#374151'
                    }}>
                      <CheckCircle size={18} style={{
                        marginRight: '0.75rem',
                        color: '#10b981',
                        flexShrink: 0
                      }} />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            </Col>
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
            }}>Ready for Your Project?</h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>Let's create something amazing together. Get in touch to discuss your project.</p>
            
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Start Your Project
                <ArrowRight size={20} />
              </Button>
              
              <Button
                as={Link}
                to="/portfolio"
                variant="outline-light"
                size="lg"
                style={{
                  borderRadius: '50px',
                  padding: '1rem 2.5rem',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}
              >
                View More Projects
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default PortfolioDetail;