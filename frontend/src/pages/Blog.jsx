import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Star, BookOpen } from 'lucide-react';
import api from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([
    {
      _id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.',
      content: 'Full article content...',
      author: 'John Smith',
      publishedAt: '2024-01-15',
      category: 'Web Development',
      image: '/api/placeholder/800/400',
      slug: 'future-web-development-2024',
      readTime: '5 min read'
    },
    {
      _id: '2',
      title: 'Digital Marketing Strategies That Actually Work',
      excerpt: 'Discover proven digital marketing strategies that drive real results and boost your online presence.',
      content: 'Full article content...',
      author: 'Sarah Johnson',
      publishedAt: '2024-01-12',
      category: 'Digital Marketing',
      image: '/api/placeholder/800/400',
      slug: 'digital-marketing-strategies',
      readTime: '7 min read'
    },
    {
      _id: '3',
      title: 'UI/UX Design Principles for Better User Experience',
      excerpt: 'Learn the fundamental design principles that create intuitive and engaging user experiences.',
      content: 'Full article content...',
      author: 'Mike Davis',
      publishedAt: '2024-01-10',
      category: 'Design',
      image: '/api/placeholder/800/400',
      slug: 'ux-design-principles',
      readTime: '6 min read'
    },
    {
      _id: '4',
      title: 'SEO Best Practices for 2024: A Complete Guide',
      excerpt: 'Stay ahead of the competition with the latest SEO strategies and best practices for better rankings.',
      content: 'Full article content...',
      author: 'Emily Chen',
      publishedAt: '2024-01-08',
      category: 'SEO',
      image: '/api/placeholder/800/400',
      slug: 'seo-best-practices-2024',
      readTime: '8 min read'
    },
    {
      _id: '5',
      title: 'Building Scalable E-commerce Solutions',
      excerpt: 'Learn how to build e-commerce platforms that can handle growth and provide excellent user experience.',
      content: 'Full article content...',
      author: 'David Wilson',
      publishedAt: '2024-01-05',
      category: 'E-commerce',
      image: '/api/placeholder/800/400',
      slug: 'scalable-ecommerce-solutions',
      readTime: '10 min read'
    },
    {
      _id: '6',
      title: 'The Power of Brand Identity in Digital Age',
      excerpt: 'Understand how strong brand identity can differentiate your business in the competitive digital landscape.',
      content: 'Full article content...',
      author: 'Lisa Anderson',
      publishedAt: '2024-01-03',
      category: 'Branding',
      image: '/api/placeholder/800/400',
      slug: 'brand-identity-digital-age',
      readTime: '4 min read'
    }
  ]);

  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/blog');
      if (response.data?.length) {
        setPosts(response.data);
        setFeaturedPost(response.data[0]);
      } else {
        setFeaturedPost(posts[0]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setFeaturedPost(posts[0]);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                <BookOpen size={16} style={{ marginRight: '0.5rem', color: '#10b981' }} />
                Knowledge & Insights
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
                }}>
                  Blog
                </span>
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Insights, tips, and industry knowledge to help you stay ahead in the digital world.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section style={{ padding: '4rem 0', background: 'white' }}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '3rem' }}
            >
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: '900',
                textAlign: 'center',
                marginBottom: '3rem',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif'
              }}>Featured Article</h2>
              
              <Card style={{
                border: 'none',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <Row className="g-0">
                  <Col lg={6}>
                    <div style={{
                      position: 'relative',
                      height: '300px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={featuredPost.image || '/api/placeholder/800/400'} 
                        alt={featuredPost.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem'
                      }}>
                        <Badge style={{
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          Featured
                        </Badge>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div style={{
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      height: '100%'
                    }}>
                      <Badge style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        width: 'fit-content',
                        marginBottom: '1rem'
                      }}>
                        {featuredPost.category}
                      </Badge>
                      
                      <h3 style={{
                        fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: '#1f2937',
                        lineHeight: '1.3'
                      }}>
                        {featuredPost.title}
                      </h3>
                      
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '1.5rem',
                        fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                        lineHeight: '1.6'
                      }}>
                        {featuredPost.excerpt}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        color: '#6b7280'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <User size={16} />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={16} />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock size={16} />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      
                      <Button
                        as={Link}
                        to={`/blog/${featuredPost.slug}`}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '600',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          width: 'fit-content'
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
                        Read Full Article
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
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
            }}>Latest Articles</h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Stay updated with the latest trends, tips, and insights from our experts</p>
          </motion.div>

          <Row>
            {posts.slice(1).map((post, index) => (
              <Col key={post._id} md={6} lg={4} className="mb-4">
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
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    background: 'white'
                  }}>
                    <div style={{
                      position: 'relative',
                      height: '200px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={post.image || '/api/placeholder/400/300'} 
                        alt={post.title}
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
                          background: 'rgba(255, 255, 255, 0.9)',
                          color: '#374151',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <Card.Body style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        color: '#1f2937',
                        lineHeight: '1.4',
                        transition: 'color 0.3s ease'
                      }}>
                        {post.title}
                      </h3>
                      
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '1rem',
                        fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                        lineHeight: '1.6'
                      }}>
                        {post.excerpt}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={12} />
                            <span>{post.author}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      
                      <Button
                        as={Link}
                        to={`/blog/${post.slug}`}
                        variant="outline-primary"
                        style={{
                          width: '100%',
                          borderRadius: '12px',
                          padding: '0.5rem 1rem',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          border: '2px solid #3b82f6',
                          color: '#3b82f6'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#3b82f6';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#3b82f6';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
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
            }}>Stay Updated</h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>Subscribe to our newsletter and get the latest insights delivered to your inbox</p>
            
            <Row className="justify-content-center">
              <Col md={6}>
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    style={{
                      padding: '1rem 1.5rem',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '1rem',
                      outline: 'none',
                      color: '#374151'
                    }}
                  />
                  <Button
                    style={{
                      background: 'white',
                      color: '#3b82f6',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem 2rem',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Blog;