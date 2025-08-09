import { useState } from 'react';
import { CreditCard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';
import api from '../../utils/api';

const CheckoutForm = ({ service, packageType, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { customer, isCustomerAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if customer is authenticated
    if (!isCustomerAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    await processPayment();
  };

  const processPayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Create order with authenticated customer
      const orderResponse = await api.post('/payment/create-order', {
        serviceId: service._id,
        packageType,
        customerDetails: {
          ...formData,
          name: customer?.name || formData.name,
          email: customer?.email || formData.email,
          phone: customer?.phone || formData.phone,
          company: customer?.company || formData.company
        }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('customerToken')}` }
      });

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: orderResponse.data.keyId,
          amount: orderResponse.data.amount,
          currency: orderResponse.data.currency,
          name: '1Roof Biz Solution',
          description: `${service.name} - ${packageType} Package`,
          order_id: orderResponse.data.orderId,
          handler: async (response) => {
            try {
              const verifyResponse = await api.post('/payment/verify-payment', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('customerToken')}` }
              });

              if (verifyResponse.data.success) {
                onSuccess();
              }
            } catch (error) {
              setError('Payment verification failed');
            }
          },
          prefill: {
            name: customer?.name || formData.name,
            email: customer?.email || formData.email,
            contact: customer?.phone || formData.phone
          },
          theme: {
            color: '#007bff'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    processPayment();
  };

  return (
    <>
      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        customerDetails={formData}
      />
      
      <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
      <div className="card-body p-4">
        <div className="mb-4">
          <h4 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '0.5rem' }}>
            Billing Information
          </h4>
          <p className="text-muted mb-0">
            Please fill in your details to complete the purchase
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ borderRadius: '12px' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Full Name *</label>
              <input
                type="text"
                className="form-control"
                style={{
                  height: '50px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1rem'
                }}
                placeholder="Enter your full name"
                value={isCustomerAuthenticated ? customer?.name || '' : formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                readOnly={isCustomerAuthenticated}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email Address *</label>
              <input
                type="email"
                className="form-control"
                style={{
                  height: '50px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1rem'
                }}
                placeholder="Enter your email"
                value={isCustomerAuthenticated ? customer?.email || '' : formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                readOnly={isCustomerAuthenticated}
                required
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Phone Number *</label>
              <input
                type="tel"
                className="form-control"
                style={{
                  height: '50px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1rem'
                }}
                placeholder="Enter your phone number"
                value={isCustomerAuthenticated ? customer?.phone || '' : formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                readOnly={isCustomerAuthenticated}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Company</label>
              <input
                type="text"
                className="form-control"
                style={{
                  height: '50px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '1rem'
                }}
                placeholder="Company name (optional)"
                value={isCustomerAuthenticated ? customer?.company || '' : formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                readOnly={isCustomerAuthenticated}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-semibold">Project Requirements</label>
            <textarea
              className="form-control"
              rows="4"
              style={{
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              placeholder="Tell us about your project requirements, timeline, and any specific needs..."
            />
          </div>
          
          <button
            type="submit"
            className="btn w-100 d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
            style={{
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              border: 'none',
              height: '60px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'white',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                {isCustomerAuthenticated 
                  ? `Pay ₹${service.pricing[packageType]?.price?.toLocaleString()}`
                  : 'Continue to Payment'
                }
              </>
            )}
          </button>
          
          <div className="text-center mt-3">
            <small className="text-muted">
              By proceeding, you agree to our terms of service and privacy policy
            </small>
          </div>
        </form>
        
        {!isCustomerAuthenticated && (
          <div className="mt-3 p-3" style={{ background: '#fef3c7', borderRadius: '12px', border: '1px solid #f59e0b' }}>
            <div className="d-flex align-items-center">
              <Shield size={20} className="text-warning me-2" />
              <div>
                <small className="fw-semibold text-warning">Secure Checkout</small>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                  You'll be asked to login or create an account before payment for security.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default CheckoutForm;