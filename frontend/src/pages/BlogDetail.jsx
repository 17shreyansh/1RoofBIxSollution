import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock,
  Share2,
  BookOpen,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';
import api from '../utils/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Comprehensive mock data
  const mockPosts = {
    'future-web-development-2024': {
      title: 'The Future of Web Development: Trends to Watch in 2024',
      slug: 'future-web-development-2024',
      excerpt: 'Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.',
      content: `
        <h2>Introduction</h2>
        <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will reshape how we build and interact with websites. From artificial intelligence integration to advanced progressive web apps, developers need to stay ahead of the curve to remain competitive.</p>
        
        <h2>1. AI-Powered Development Tools</h2>
        <p>Artificial Intelligence is revolutionizing web development by automating repetitive tasks and enhancing developer productivity. AI-powered code completion, automated testing, and intelligent debugging tools are becoming essential parts of the modern developer's toolkit.</p>
        
        <h3>Key Benefits:</h3>
        <ul>
          <li>Faster development cycles</li>
          <li>Reduced human error</li>
          <li>Intelligent code suggestions</li>
          <li>Automated optimization</li>
        </ul>
        
        <h2>2. Progressive Web Apps (PWAs) Evolution</h2>
        <p>Progressive Web Apps continue to bridge the gap between web and native applications. With improved offline capabilities, push notifications, and app-like experiences, PWAs are becoming the preferred choice for businesses looking to reach users across all platforms.</p>
        
        <h2>3. WebAssembly (WASM) Adoption</h2>
        <p>WebAssembly is enabling high-performance applications to run in browsers at near-native speeds. This technology is particularly valuable for complex applications like games, image editors, and scientific simulations.</p>
        
        <h2>4. Serverless Architecture</h2>
        <p>Serverless computing is simplifying deployment and scaling for web applications. With services like AWS Lambda, Vercel Functions, and Netlify Functions, developers can focus on code rather than infrastructure management.</p>
        
        <h2>5. Enhanced Security Measures</h2>
        <p>As cyber threats evolve, web security becomes increasingly important. Zero-trust architecture, advanced authentication methods, and automated security scanning are becoming standard practices.</p>
        
        <h2>Conclusion</h2>
        <p>The future of web development is bright, with technologies that promise to make development faster, more secure, and more accessible. By staying informed about these trends and gradually incorporating them into your workflow, you'll be well-positioned for success in 2024 and beyond.</p>
      `,
      author: 'John Smith',
      authorBio: 'Senior Full-Stack Developer with 8+ years of experience in modern web technologies.',
      authorImage: '/api/placeholder/100/100',
      publishedAt: '2024-01-15',
      category: 'Web Development',
      tags: ['JavaScript', 'React', 'AI', 'PWA', 'WebAssembly'],
      image: '/api/placeholder/1200/600',
      readTime: '5 min read',
      views: 1250,
      likes: 89,
      comments: 23,
      seo: {
        metaTitle: 'Future of Web Development 2024 - Latest Trends & Technologies',
        metaDescription: 'Discover the top web development trends for 2024 including AI integration, PWAs, WebAssembly, and more.',
        keywords: ['web development', '2024 trends', 'AI', 'PWA', 'WebAssembly']
      }
    },
    'digital-marketing-strategies': {
      title: 'Digital Marketing Strategies That Actually Work',
      slug: 'digital-marketing-strategies',
      excerpt: 'Discover proven digital marketing strategies that drive real results and boost your online presence.',
      content: `
        <h2>Introduction</h2>
        <p>In today's competitive digital landscape, having effective marketing strategies is crucial for business success. This comprehensive guide explores proven tactics that deliver measurable results and help businesses grow their online presence.</p>
        
        <h2>1. Content Marketing Excellence</h2>
        <p>Quality content remains the foundation of successful digital marketing. Creating valuable, relevant content that addresses your audience's pain points builds trust and establishes authority in your industry.</p>
        
        <h3>Content Strategy Tips:</h3>
        <ul>
          <li>Focus on solving customer problems</li>
          <li>Maintain consistent publishing schedule</li>
          <li>Optimize for search engines</li>
          <li>Repurpose content across platforms</li>
        </ul>
        
        <h2>2. Search Engine Optimization (SEO)</h2>
        <p>SEO continues to be one of the most cost-effective marketing strategies. By optimizing your website for search engines, you can attract organic traffic and improve your online visibility.</p>
        
        <h2>3. Social Media Marketing</h2>
        <p>Social media platforms offer unprecedented opportunities to connect with your audience. The key is choosing the right platforms and creating engaging content that resonates with your target demographic.</p>
        
        <h2>4. Email Marketing Automation</h2>
        <p>Email marketing remains one of the highest ROI marketing channels. Automated email sequences can nurture leads, onboard new customers, and retain existing ones effectively.</p>
        
        <h2>5. Pay-Per-Click (PPC) Advertising</h2>
        <p>PPC advertising provides immediate visibility and can be highly targeted. When executed properly, PPC campaigns can deliver excellent returns on investment.</p>
        
        <h2>Measuring Success</h2>
        <p>The key to successful digital marketing is continuous measurement and optimization. Use analytics tools to track performance and make data-driven decisions.</p>
        
        <h2>Conclusion</h2>
        <p>Successful digital marketing requires a multi-channel approach, consistent execution, and continuous optimization. By implementing these proven strategies, businesses can achieve sustainable growth and build lasting relationships with their customers.</p>
      `,
      author: 'Sarah Johnson',
      authorBio: 'Digital Marketing Specialist with expertise in SEO, PPC, and content marketing.',
      authorImage: '/api/placeholder/100/100',
      publishedAt: '2024-01-12',
      category: 'Digital Marketing',
      tags: ['SEO', 'Content Marketing', 'Social Media', 'PPC', 'Email Marketing'],
      image: '/api/placeholder/1200/600',
      readTime: '7 min read',
      views: 980,
      likes: 67,
      comments: 18,
      seo: {
        metaTitle: 'Proven Digital Marketing Strategies for Business Growth',
        metaDescription: 'Learn effective digital marketing strategies including SEO, content marketing, social media, and PPC advertising.',
        keywords: ['digital marketing', 'SEO', 'content marketing', 'social media', 'PPC']
      }
    }
  };

  const mockPost = mockPosts[slug] || mockPosts['future-web-development-2024'];

  // Mock related posts
  const mockRelatedPosts = [
    {
      _id: '1',
      title: 'UI/UX Design Principles for Better User Experience',
      slug: 'ux-design-principles',
      excerpt: 'Learn the fundamental design principles that create intuitive and engaging user experiences.',
      category: 'Design',
      image: '/api/placeholder/400/250',
      readTime: '6 min read',
      publishedAt: '2024-01-10'
    },
    {
      _id: '2',
      title: 'SEO Best Practices for 2024: A Complete Guide',
      slug: 'seo-best-practices-2024',
      excerpt: 'Stay ahead of the competition with the latest SEO strategies and best practices.',
      category: 'SEO',
      image: '/api/placeholder/400/250',
      readTime: '8 min read',
      publishedAt: '2024-01-08'
    },
    {
      _id: '3',
      title: 'Building Scalable E-commerce Solutions',
      slug: 'scalable-ecommerce-solutions',
      excerpt: 'Learn how to build e-commerce platforms that can handle growth and provide excellent UX.',
      category: 'E-commerce',
      image: '/api/placeholder/400/250',
      readTime: '10 min read',
      publishedAt: '2024-01-05'
    }
  ];

  useEffect(() => {
    fetchPost();
    setRelatedPosts(mockRelatedPosts);
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      // For now, use mock data
      setPost(mockPost);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setPost(mockPost);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '140px' }}>
        <Container>
          <div className="text-center">
            <h1>Article Not Found</h1>
            <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
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
              to="/blog" 
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
              Back to Blog
            </Link>
            
            <Row>
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
                  {post.category}
                </Badge>
                
                <h1 style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: '900',
                  marginBottom: '1.5rem',
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: '1.2'
                }}>
                  {post.title}
                </h1>
                
                <p style={{
                  fontSize: '1.2rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '2rem',
                  lineHeight: '1.7'
                }}>
                  {post.excerpt}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} />
                    {post.readTime}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Eye size={16} />
                    {post.views?.toLocaleString()} views
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {post.tags?.map((tag, index) => (
                    <span key={index} style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      backdropFilter: 'blur(10px)'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Article Image */}
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
              src={post.image} 
              alt={post.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        </Container>
      </section>

      {/* Article Content */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div 
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#374151'
                  }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Article Footer */}
                <div style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                      variant="outline-primary"
                      style={{
                        borderRadius: '50px',
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Heart size={16} />
                      {post.likes} Likes
                    </Button>
                    <Button
                      variant="outline-secondary"
                      style={{
                        borderRadius: '50px',
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <MessageCircle size={16} />
                      {post.comments} Comments
                    </Button>
                    <Button
                      variant="outline-success"
                      style={{
                        borderRadius: '50px',
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>



      {/* Related Posts */}
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
            }}>Related Articles</h2>
          </motion.div>
          
          <Row>
            {relatedPosts.map((relatedPost, index) => (
              <Col key={relatedPost._id} md={4} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card style={{
                    border: 'none',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '100%',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                    <Card.Body style={{ padding: '1.5rem' }}>
                      <Badge 
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: '#3b82f6',
                          marginBottom: '1rem'
                        }}
                      >
                        {relatedPost.category}
                      </Badge>
                      <h5 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        color: '#1f2937'
                      }}>
                        {relatedPost.title}
                      </h5>
                      <p style={{
                        color: '#6b7280',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                      }}>
                        {relatedPost.excerpt}
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                        color: '#6b7280',
                        marginBottom: '1rem'
                      }}>
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                      <Button
                        as={Link}
                        to={`/blog/${relatedPost.slug}`}
                        variant="outline-primary"
                        size="sm"
                        style={{
                          borderRadius: '20px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
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
            }}>Ready to Get Started?</h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>Let's discuss your project and bring your ideas to life.</p>
            
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
                Get Started
                <ArrowRight size={20} />
              </Button>
              
              <Button
                as={Link}
                to="/blog"
                variant="outline-light"
                size="lg"
                style={{
                  borderRadius: '50px',
                  padding: '1rem 2.5rem',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <BookOpen size={20} />
                More Articles
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default BlogDetail;