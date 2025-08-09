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
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
    fetchRelatedPosts();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/blog/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const response = await api.get('/blog?limit=3');
      setRelatedPosts(response.data.blogs || []);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderEditorJSContent = (content) => {
    if (!content) return '';
    
    try {
      let contentData;
      if (typeof content === 'string') {
        if (content.trim().startsWith('<')) {
          return content; // Already HTML
        }
        contentData = JSON.parse(content);
      } else {
        contentData = content;
      }
      
      if (!contentData.blocks) return '';
      
      return contentData.blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return `<p key="${index}" style="margin-bottom: 1.5rem; line-height: 1.8;">${block.data.text}</p>`;
          
          case 'header':
            const level = block.data.level || 2;
            const headerStyle = `margin: 2rem 0 1rem 0; font-weight: 700; color: #1f2937; font-family: 'Poppins', sans-serif;`;
            return `<h${level} key="${index}" style="${headerStyle}">${block.data.text}</h${level}>`;
          
          case 'list':
            const listItems = block.data.items.map(item => `<li style="margin-bottom: 0.5rem;">${item}</li>`).join('');
            const listTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return `<${listTag} key="${index}" style="margin-bottom: 1.5rem; padding-left: 1.5rem;">${listItems}</${listTag}>`;
          
          case 'quote':
            return `<blockquote key="${index}" style="border-left: 4px solid #3b82f6; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; font-size: 1.2rem; color: #4b5563;">
              <p style="margin-bottom: 0.5rem;">${block.data.text}</p>
              ${block.data.caption ? `<cite style="font-size: 0.9rem; color: #6b7280;">— ${block.data.caption}</cite>` : ''}
            </blockquote>`;
          
          case 'code':
            return `<pre key="${index}" style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0;"><code>${block.data.code}</code></pre>`;
          
          case 'image':
            return `<div key="${index}" style="margin: 2rem 0; text-align: center;">
              <img src="${block.data.file.url}" alt="${block.data.caption || ''}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
              ${block.data.caption ? `<p style="margin-top: 0.5rem; font-size: 0.9rem; color: #6b7280; font-style: italic;">${block.data.caption}</p>` : ''}
            </div>`;
          
          case 'delimiter':
            return `<div key="${index}" style="text-align: center; margin: 3rem 0;"><span style="font-size: 1.5rem; color: #d1d5db;">* * *</span></div>`;
          
          case 'table':
            const tableRows = block.data.content.map(row => 
              `<tr>${row.map(cell => `<td style="padding: 0.75rem; border: 1px solid #e5e7eb;">${cell}</td>`).join('')}</tr>`
            ).join('');
            return `<div key="${index}" style="overflow-x: auto; margin: 1.5rem 0;"><table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">${tableRows}</table></div>`;
          
          default:
            return `<p key="${index}" style="margin-bottom: 1.5rem;">${block.data.text || ''}</p>`;
        }
      }).join('');
    } catch (error) {
      console.error('Error rendering content:', error);
      return content; // Fallback to original content
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
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || (!loading && !post)) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '140px' }}>
        <Container>
          <div className="text-center">
            <h1>Article Not Found</h1>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
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
                
                {post.excerpt && (
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '2rem',
                    lineHeight: '1.7'
                  }}>
                    {post.excerpt}
                  </p>
                )}
                
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
                    {formatDate(post.publishedAt || post.createdAt)}
                  </div>
                  {post.readTime && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} />
                      {post.readTime} min read
                    </div>
                  )}
                  {post.views && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Eye size={16} />
                      {post.views?.toLocaleString()} views
                    </div>
                  )}
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
            {post.featuredImage && (
              <img 
                src={post.featuredImage} 
                alt={post.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover'
                }}
              />
            )}
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
                  dangerouslySetInnerHTML={{ __html: renderEditorJSContent(post.content) }}
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
                    {post.likes && (
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
                    )}
                    {post.comments && (
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
                    )}
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
                        src={relatedPost.featuredImage } 
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
                        <span>{formatDate(relatedPost.publishedAt || relatedPost.createdAt)}</span>
                        {relatedPost.readTime && <span>{relatedPost.readTime} min read</span>}
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