import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, Globe, Code, Users, User, LogOut, ShoppingBag, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { customer, logout } = useAuth();

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
                href="mailto:info@1roofbizsolution.com" 
                style={contactLinkStyle}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.05 
                }}
              >
                <Mail size={16} />
                <span>info@1roofbizsolution.com</span>
              </motion.a>
              <motion.a 
                href="tel:+919876543210" 
                style={contactLinkStyle}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.05 
                }}
              >
                <Phone size={16} />
                <span>+91 98765 43210</span>
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
      <nav style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem) 0' }}>
        <Container>
          <div className="d-flex justify-content-between align-items-center w-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
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
                  alt="1roofBizSolution" 
                  style={{
                    height: 'clamp(40px, 5vw, 50px)',
                    width: 'auto',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply'
                  }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="d-none d-lg-flex align-items-center">
            {navItems.map((item, index) => {
              const isActive = isActiveLink(item.path);
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link 
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
                  </Link>
                </motion.div>
              );
            })}
            
            {/* Desktop User Menu */}
            {customer ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                style={{ marginLeft: '0.5rem' }}
              >
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '2px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '50px',
                      padding: '0.75rem 1.5rem',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      color: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <User size={16} />
                    {customer.name || customer.email.split('@')[0]}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                      padding: '0.5rem'
                    }}
                  >
                    <Dropdown.Item
                      as={Link}
                      to="/my-orders"
                      style={{
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#374151',
                        textDecoration: 'none'
                      }}
                    >
                      <ShoppingBag size={16} />
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={logout}
                      style={{
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#ef4444'
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  style={{ marginLeft: '0.5rem' }}
                >
                  <Link
                    to="/login"
                    style={{
                      color: '#6b7280',
                      fontWeight: '600',
                      textDecoration: 'none',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(107, 114, 128, 0.1)';
                      e.target.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#6b7280';
                    }}
                  >
                    Login
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 }}
                  style={{ marginLeft: '0.5rem' }}
                >
                  <Button
                    as={Link}
                    to="/signup"
                    variant="outline-primary"
                    style={{
                      borderRadius: '50px',
                      padding: '0.75rem 1.5rem',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </>
            )}
            
            {/* Desktop CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              style={{ marginLeft: '0.5rem' }}
            >
              <Button
                as={Link}
                to="/contact"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: '600',
                  fontSize: '0.95rem',
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
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="d-lg-none"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                border: 'none',
                padding: '0.75rem',
                background: isMenuOpen ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
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
            </motion.button>
          </div>
        </Container>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1040
              }}
              className="d-lg-none"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '300px',
                height: '100vh',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)',
                zIndex: 1050,
                overflowY: 'auto',
                padding: '2rem 1.5rem'
              }}
              className="d-lg-none"
            >
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
                  {customer ? (
                    <>
                      <div className="text-center mb-3 p-3" style={{ background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}>
                        <User size={24} className="text-primary mb-2" />
                        <div className="fw-bold">{customer.name || customer.email.split('@')[0]}</div>
                        <small className="text-muted">{customer.email}</small>
                      </div>
                      <Button
                        as={Link}
                        to="/my-orders"
                        onClick={() => setIsMenuOpen(false)}
                        variant="outline-primary"
                        style={{
                          borderRadius: '12px',
                          padding: '0.75rem 1rem',
                          fontWeight: '600',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <ShoppingBag size={16} />
                        My Orders
                      </Button>
                      <Button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        variant="outline-danger"
                        style={{
                          borderRadius: '12px',
                          padding: '0.75rem 1rem',
                          fontWeight: '600',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          marginBottom: '1rem'
                        }}
                      >
                        <LogOut size={16} />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="d-flex gap-2 mb-3">
                      <Button
                        as={Link}
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        variant="outline-primary"
                        style={{
                          borderRadius: '12px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '600',
                          flex: 1
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        as={Link}
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '600',
                          flex: 1
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                  <Button
                    as={Link}
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;