import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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
  const { customer, setCustomerFromPayment } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create order
      const orderResponse = await api.post('/payment/create-order', {
        serviceId: service._id,
        packageType,
        customerDetails: formData
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
                razorpay_signature: response.razorpay_signature,
                customerId: orderResponse.data.customerId
              });

              if (verifyResponse.data.success) {
                setCustomerFromPayment(verifyResponse.data.token, verifyResponse.data.customer);
                onSuccess();
              }
            } catch (error) {
              setError('Payment verification failed');
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
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

  return (
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
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
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
                Pay ₹{service.pricing[packageType]?.price?.toLocaleString()}
              </>
            )}
          </button>
          
          <div className="text-center mt-3">
            <small className="text-muted">
              By proceeding, you agree to our terms of service and privacy policy
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;