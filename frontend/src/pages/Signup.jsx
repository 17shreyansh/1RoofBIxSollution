import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, ArrowRight, CheckCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/customer/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
        <div className="container-fluid h-100">
          <div className="row min-vh-100 align-items-center justify-content-center">
            <div className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-white"
              >
                <CheckCircle size={80} className="text-success mb-4" />
                <h2 className="fw-bold mb-3">Account Created!</h2>
                <p className="mb-4">Your account has been created successfully. Redirecting to login...</p>
                <Link to="/login" className="btn btn-primary">
                  Go to Login
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
      <div className="container-fluid h-100">
        <div className="row min-vh-100">
          {/* Left Side - Branding */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-white position-relative">
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
              opacity: 0.8
            }} />
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center position-relative z-index-1"
            >
              <img src={logo} alt="1Roof Biz Solution" style={{ height: '80px', marginBottom: '2rem' }} />
              <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', fontFamily: 'Poppins, sans-serif' }}>
                Join Us Today
              </h1>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px' }}>
                Create your account and start your journey with our premium services
              </p>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center bg-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-100"
              style={{ maxWidth: '400px', padding: '2rem' }}
            >
              <div className="text-center mb-4 d-lg-none">
                <img src={logo} alt="1Roof Biz Solution" style={{ height: '60px', marginBottom: '1rem' }} />
              </div>

              <h2 className="fw-bold mb-2" style={{ color: '#1f2937', fontSize: '2rem' }}>
                Create Account
              </h2>
              <p className="text-muted mb-4">
                Join thousands of satisfied customers
              </p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="alert alert-danger"
                  style={{ borderRadius: '12px' }}
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <div className="position-relative">
                    <User size={20} className="position-absolute" style={{
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6b7280'
                    }} />
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        paddingLeft: '45px',
                        height: '50px',
                        borderRadius: '12px',
                        border: '2px solid #e5e7eb',
                        fontSize: '1rem'
                      }}
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <div className="position-relative">
                    <Mail size={20} className="position-absolute" style={{
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6b7280'
                    }} />
                    <input
                      type="email"
                      className="form-control"
                      style={{
                        paddingLeft: '45px',
                        height: '50px',
                        borderRadius: '12px',
                        border: '2px solid #e5e7eb',
                        fontSize: '1rem'
                      }}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <div className="position-relative">
                      <Phone size={20} className="position-absolute" style={{
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6b7280'
                      }} />
                      <input
                        type="tel"
                        className="form-control"
                        style={{
                          paddingLeft: '45px',
                          height: '50px',
                          borderRadius: '12px',
                          border: '2px solid #e5e7eb',
                          fontSize: '1rem'
                        }}
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Company</label>
                    <div className="position-relative">
                      <Building size={20} className="position-absolute" style={{
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6b7280'
                      }} />
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          paddingLeft: '45px',
                          height: '50px',
                          borderRadius: '12px',
                          border: '2px solid #e5e7eb',
                          fontSize: '1rem'
                        }}
                        placeholder="Company (optional)"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="position-relative">
                    <Lock size={20} className="position-absolute" style={{
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6b7280'
                    }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      style={{
                        paddingLeft: '45px',
                        paddingRight: '45px',
                        height: '50px',
                        borderRadius: '12px',
                        border: '2px solid #e5e7eb',
                        fontSize: '1rem'
                      }}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      className="btn position-absolute"
                      style={{
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'none',
                        color: '#6b7280'
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <div className="position-relative">
                    <Lock size={20} className="position-absolute" style={{
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6b7280'
                    }} />
                    <input
                      type="password"
                      className="form-control"
                      style={{
                        paddingLeft: '45px',
                        height: '50px',
                        borderRadius: '12px',
                        border: '2px solid #e5e7eb',
                        fontSize: '1rem'
                      }}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    height: '50px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white'
                  }}
                >
                  {loading ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#3b82f6' }}>
                    Sign In
                  </Link>
                </p>
              </div>

              <div className="text-center mt-4">
                <Link to="/" className="text-muted text-decoration-none">
                  ← Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;