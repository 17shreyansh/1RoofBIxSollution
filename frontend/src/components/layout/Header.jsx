import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, Globe, Code, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleScroll();
    checkMobile();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1050,
    transition: 'all 0.3s ease',
    background: isScrolled 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    boxShadow: isScrolled 
      ? 'none' 
      : '0 2px 20px rgba(0, 0, 0, 0.05)',
    borderBottom: isScrolled ? 'none' : '1px solid rgba(0, 0, 0, 0.05)'
  };

  const topBarStyle = {
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    color: 'white',
    padding: '0.75rem 0',
    fontSize: '0.875rem',
    display: isMobile ? 'none' : 'block'
  };

  const contactLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px'
  };

  const logoStyle = {
    fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'none',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.3s ease'
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Globe },
    { path: '/about', label: 'About', icon: Users },
    { path: '/services', label: 'Services', icon: Code },
    { path: '/portfolio', label: 'Portfolio', icon: Globe },
    { path: '/blog', label: 'Blog', icon: Globe },
    { path: '/contact', label: 'Contact', icon: Phone }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const getNavLinkStyle = (isActive) => ({
    color: isActive ? '#3b82f6' : '#374151',
    fontWeight: isActive ? '700' : '600',
    textDecoration: 'none',
    margin: '0 0.5rem',
    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    position: 'relative',
    background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
    border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
  });

  return (
    <motion.header 
      style={headerStyle}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Top Bar */}
      {!isMobile && <div style={topBarStyle}>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <motion.div 
              className="d-flex align-items-center" 
              style={{ gap: '2rem' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.a 
                href="mailto:info@roofbizsolutions.com" 
                style={contactLinkStyle}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.05 
                }}
              >
                <Mail size={16} />
                <span>info@roofbizsolutions.com</span>
              </motion.a>
              <motion.a 
                href="tel:+1234567890" 
                style={contactLinkStyle}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.05 
                }}
              >
                <Phone size={16} />
                <span>+1 (234) 567-890</span>
              </motion.a>
            </motion.div>

            <motion.div
              style={{
                fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="d-none d-lg-block"
            >
              <Users size={14} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Trusted by 500+ Businesses
            </motion.div>
          </div>
        </Container>
      </div>}

      {/* Main Navigation */}
      <Navbar expand="lg" style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem) 0' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Navbar.Brand 
              as={Link} 
              to="/" 
              style={{ textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              <img 
                src={logo} 
                alt="Roof Biz Solutions" 
                style={{
                  height: 'clamp(40px, 5vw, 50px)',
                  width: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',

                }}
              />
            </Navbar.Brand>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.div
            whileTap={{ scale: 0.95 }}
          >
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                border: 'none',
                padding: '0.5rem',
                background: isMenuOpen ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X size={24} style={{ color: '#3b82f6' }} />
                ) : (
                  <Menu size={24} style={{ color: '#374151' }} />
                )}
              </motion.div>
            </Navbar.Toggle>
          </motion.div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {navItems.map((item, index) => {
                const isActive = isActiveLink(item.path);
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Nav.Link 
                      as={Link} 
                      to={item.path} 
                      style={getNavLinkStyle(isActive)}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
                          e.target.style.color = '#3b82f6';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#374151';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          style={{
                            position: 'absolute',
                            bottom: '0.25rem',
                            left: '50%',
                            width: '6px',
                            height: '6px',
                            background: '#3b82f6',
                            borderRadius: '50%',
                            transform: 'translateX(-50%)'
                          }}
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Nav.Link>
                  </motion.div>
                );
              })}
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                style={{ marginLeft: '1rem' }}
              >
                <Button
                  as={Link}
                  to="/contact"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)',
                    fontWeight: '600',
                    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                    e.target.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                    e.target.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
                  }}
                >
                  Get Quote
                  <ArrowRight size={16} />
                </Button>
              </motion.div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '2rem 0',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              zIndex: 1040,
              display: window.innerWidth >= 992 ? 'none' : 'block'
            }}
          >
            <Container>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {navItems.map((item, index) => {
                  const isActive = isActiveLink(item.path);
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color: isActive ? '#3b82f6' : '#374151',
                          background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                          border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                          fontWeight: isActive ? '700' : '600',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <IconComponent size={20} />
                        {item.label}
                        {isActive && <ArrowRight size={16} style={{ marginLeft: 'auto' }} />}
                      </Link>
                    </motion.div>
                  );
                })}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{ marginTop: '1rem' }}
                >
                  <Button
                    as={Link}
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem',
                      fontWeight: '600',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Get Free Quote
                    <ArrowRight size={16} />
                  </Button>
                </motion.div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;