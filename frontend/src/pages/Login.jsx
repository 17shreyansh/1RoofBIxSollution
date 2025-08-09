import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { customerLogin, adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await customerLogin(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
                Welcome Back
              </h1>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px' }}>
                Sign in to track your orders and manage your account
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
                Sign In
              </h2>
              <p className="text-muted mb-4">
                Access your customer account
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

                <div className="mb-4">
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
                      placeholder="Enter your password"
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
                      Sign In
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/signup" className="fw-bold text-decoration-none" style={{ color: '#3b82f6' }}>
                    Sign Up
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

export default Login;