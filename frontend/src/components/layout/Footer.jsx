import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#0f172a',
    color: 'white',
    paddingTop: '3rem',
    paddingBottom: '2rem'
  };

  const linkStyle = {
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  const socialIconStyle = {
    color: '#9ca3af',
    marginRight: '1rem',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          {/* Company Info */}
          <Col lg={3} md={6} className="mb-4">
            <h3 className="h5 fw-bold mb-3">1roofBizSolution</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              We Turn Ideas Into Brands. Brands Into Businesses.
            </p>
            <div className="d-flex">
              <Facebook size={20} style={socialIconStyle} />
              <Twitter size={20} style={socialIconStyle} />
              <Instagram size={20} style={socialIconStyle} />
              <Linkedin size={20} style={socialIconStyle} />
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6} className="mb-4">
            <h4 className="h6 fw-semibold mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" style={linkStyle}>Home</Link></li>
              <li className="mb-2"><Link to="/about" style={linkStyle}>About</Link></li>
              <li className="mb-2"><Link to="/services" style={linkStyle}>Services</Link></li>
              <li className="mb-2"><Link to="/portfolio" style={linkStyle}>Portfolio</Link></li>
              <li className="mb-2"><Link to="/contact" style={linkStyle}>Contact</Link></li>
            </ul>
          </Col>

          {/* Services */}
          <Col lg={3} md={6} className="mb-4">
            <h4 className="h6 fw-semibold mb-3">Services</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" style={linkStyle}>Web Development</a></li>
              <li className="mb-2"><a href="#" style={linkStyle}>Digital Marketing</a></li>
              <li className="mb-2"><a href="#" style={linkStyle}>Brand Design</a></li>
              <li className="mb-2"><a href="#" style={linkStyle}>SEO Services</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6} className="mb-4">
            <h4 className="h6 fw-semibold mb-3">Contact Info</h4>
            <div>
              <div className="d-flex align-items-center mb-2">
                <Mail size={16} style={{ marginRight: '0.75rem' }} />
                <span style={{ color: '#9ca3af' }}>info@1roofbizsolution.com</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Phone size={16} style={{ marginRight: '0.75rem' }} />
                <span style={{ color: '#9ca3af' }}>+91 98765 43210</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <MapPin size={16} style={{ marginRight: '0.75rem' }} />
                <span style={{ color: '#9ca3af' }}>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: '#374151', margin: '2rem 0 1rem 0' }} />
        <div className="text-center">
          <p style={{ color: '#9ca3af', margin: 0 }}>
            © 2024 1roofBizSolution. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;