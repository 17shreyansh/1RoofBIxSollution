import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const AuthModal = ({ show, onHide, onSuccess, customerDetails }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(null);
  const { customerLogin, setCustomerFromPayment } = useAuth();

  const [authData, setAuthData] = useState({
    password: '',
    confirmPassword: ''
  });

  // Check if email exists when modal opens
  React.useEffect(() => {
    if (show && customerDetails.email) {
      checkEmailExists(customerDetails.email);
    }
  }, [show, customerDetails.email]);

  const checkEmailExists = async (email) => {
    if (!email) return;
    
    setCheckingEmail(true);
    try {
      const response = await api.post('/customer/check-email', { email });
      setEmailExists(response.data.exists);
      setActiveTab(response.data.exists ? 'login' : 'signup');
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!emailExists && authData.password !== authData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (authData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!emailExists && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(authData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      setLoading(false);
      return;
    }

    try {
      // Use quick-auth endpoint for streamlined flow
      const response = await api.post('/customer/quick-auth', {
        email: customerDetails.email,
        password: authData.password,
        name: customerDetails.name,
        phone: customerDetails.phone,
        company: customerDetails.company
      });
      
      // Set authentication in context
      setCustomerFromPayment(response.data.token, response.data.customer);
      
      onSuccess();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Authentication failed';
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors.map(err => err.msg).join(', ');
        setError(validationErrors);
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title style={{ color: '#1f2937', fontWeight: '700' }}>
          {checkingEmail ? 'Checking...' : emailExists ? 'Welcome Back!' : 'Create Account'}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="px-4 pb-4">
        {checkingEmail ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Checking your account...</p>
          </div>
        ) : (
          <>
            {/* Customer Details Summary */}
            <div className="mb-4 p-3" style={{ background: '#f8fafc', borderRadius: '12px' }}>
              <h6 className="fw-semibold mb-2">Your Details:</h6>
              <div className="row text-sm">
                <div className="col-6">
                  <strong>Name:</strong> {customerDetails.name}<br/>
                  <strong>Email:</strong> {customerDetails.email}
                </div>
                <div className="col-6">
                  <strong>Phone:</strong> {customerDetails.phone}<br/>
                  {customerDetails.company && <><strong>Company:</strong> {customerDetails.company}</>}
                </div>
              </div>
            </div>

            <p className="text-muted mb-4">
              {emailExists 
                ? 'Please enter your password to continue with the purchase.'
                : 'Set a password to create your account and complete the purchase.'
              }
            </p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleAuth}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  <Lock size={16} className="me-2" />
                  {emailExists ? 'Password' : 'Create Password'} *
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={authData.password}
                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    style={{ height: '50px', borderRadius: '12px', paddingRight: '50px' }}
                    minLength={6}
                    required
                  />
                  <Button
                    variant="link"
                    className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ zIndex: 10 }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                {!emailExists && (
                  <Form.Text className="text-muted">
                    Must contain uppercase, lowercase, and number (min 6 chars)
                  </Form.Text>
                )}
              </Form.Group>

              {!emailExists && (
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <Lock size={16} className="me-2" />
                    Confirm Password *
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={authData.confirmPassword}
                    onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})}
                    style={{ height: '50px', borderRadius: '12px' }}
                    required
                  />
                </Form.Group>
              )}

              <Button
                type="submit"
                className="w-100"
                disabled={loading}
                style={{
                  background: emailExists 
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  height: '50px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}
              >
                {loading 
                  ? (emailExists ? 'Logging in...' : 'Creating Account...')
                  : (emailExists ? 'Login & Continue' : 'Create Account & Continue')
                }
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;