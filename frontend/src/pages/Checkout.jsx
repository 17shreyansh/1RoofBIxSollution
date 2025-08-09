import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Package, CreditCard, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import api from '../utils/api';

const Checkout = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug, packageType } = useParams();
  const navigate = useNavigate();
  const { customer } = useAuth();

  useEffect(() => {
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    try {
      const response = await api.get(`/services/${slug}`);
      setService(response.data);
    } catch (error) {
      console.error('Error fetching service:', error);
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    navigate('/my-orders');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '140px', background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service || !service.pricing[packageType]) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '140px', background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center py-5">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', padding: '3rem' }}>
              <Package size={80} className="text-muted mx-auto mb-4" />
              <h3 style={{ color: '#1f2937', fontWeight: '700' }}>Service Not Found</h3>
              <p className="text-muted mb-4">The service or package you're looking for doesn't exist.</p>
              <Link
                to="/services"
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Back to Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '140px', background: '#f8fafc' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <Link 
            to={`/services/${slug}`}
            className="d-inline-flex align-items-center text-decoration-none mb-3"
            style={{ color: '#6b7280', fontWeight: '500' }}
          >
            <ArrowLeft size={20} className="me-2" />
            Back to Service
          </Link>
          
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: '900',
            color: '#1f2937',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '0.5rem'
          }}>
            Complete Your Purchase
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            You're about to purchase <strong>{service.name}</strong> - {packageType} package
          </p>
        </motion.div>

        <div className="row">
          {/* Checkout Form */}
          <div className="col-lg-8 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CheckoutForm 
                service={service}
                packageType={packageType}
                onSuccess={handlePaymentSuccess}
              />
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div className="col-lg-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card border-0 shadow-sm sticky-top"
              style={{ borderRadius: '20px', top: '160px' }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '1.5rem' }}>
                  Order Summary
                </h5>
                
                {/* Service Info */}
                <div className="mb-3 p-3" style={{ background: '#f8fafc', borderRadius: '12px' }}>
                  <h6 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {service.name}
                  </h6>
                  <div className="d-flex align-items-center text-muted mb-2">
                    <Package size={16} className="me-2" />
                    <span className="text-capitalize">{packageType} Package</span>
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <Clock size={16} className="me-2" />
                    <span>{service.deliveryTime}</span>
                  </div>
                </div>

                {/* Package Features */}
                <div className="mb-4">
                  <h6 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '1rem' }}>
                    What's Included:
                  </h6>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {service.pricing[packageType]?.features?.map((feature, index) => (
                      <div key={index} className="d-flex align-items-start mb-2">
                        <CheckCircle size={16} className="text-success me-2 mt-1" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <CreditCard size={20} className="text-muted me-2" />
                      <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>Total Amount</span>
                    </div>
                    <h4 style={{ color: '#1f2937', fontWeight: '900', margin: 0 }}>
                      ₹{service.pricing[packageType]?.price?.toLocaleString()}
                    </h4>
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-center text-muted">
                    <Shield size={16} className="me-2" />
                    <small>Secure payment powered by Razorpay</small>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;