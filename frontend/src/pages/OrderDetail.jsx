import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Calendar, CreditCard, User, Phone, Mail, Building, FileText, CheckCircle, Clock } from 'lucide-react';
import api from '../utils/api';

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/customer/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('customerToken')}` }
      });
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      paid: '#10b981',
      processing: '#3b82f6',
      completed: '#8b5cf6',
      cancelled: '#ef4444',
      refunded: '#6b7280'
    };
    return colors[status] || '#6b7280';
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

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '140px', background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center py-5">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', padding: '3rem' }}>
              <Package size={80} className="text-muted mx-auto mb-4" />
              <h3 style={{ color: '#1f2937', fontWeight: '700' }}>Order Not Found</h3>
              <p className="text-muted mb-4">The order you're looking for doesn't exist.</p>
              <Link
                to="/my-orders"
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
                Back to Orders
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
            to="/my-orders"
            className="d-inline-flex align-items-center text-decoration-none mb-3"
            style={{ color: '#6b7280', fontWeight: '500' }}
          >
            <ArrowLeft size={20} className="me-2" />
            Back to My Orders
          </Link>
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div>
              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: '900',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '0.5rem'
              }}>
                Order #{order.orderId.slice(-8)}
              </h1>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center text-muted">
                  <Calendar size={16} className="me-2" />
                  <span>{new Date(order.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <span
                  className="badge"
                  style={{
                    backgroundColor: getStatusColor(order.status),
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8 mb-4">
            {/* Service Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card border-0 shadow-sm mb-4"
              style={{ borderRadius: '20px' }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '1.5rem' }}>
                  Service Details
                </h5>
                
                <div className="mb-4">
                  <h6 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {order.service?.name}
                  </h6>
                  <p className="text-muted mb-3">{order.service?.description}</p>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-2">
                        <Package size={16} className="text-primary me-2" />
                        <span><strong>Package:</strong> {order.packageType}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-2">
                        <Clock size={16} className="text-primary me-2" />
                        <span><strong>Delivery:</strong> {order.service?.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {order.service?.pricing?.[order.packageType]?.features && (
                  <div>
                    <h6 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '1rem' }}>
                      Package Features:
                    </h6>
                    <div className="row">
                      {order.service.pricing[order.packageType].features.map((feature, index) => (
                        <div key={index} className="col-md-6 mb-2">
                          <div className="d-flex align-items-start">
                            <CheckCircle size={16} className="text-success me-2 mt-1" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '0.9rem', color: '#374151' }}>{feature}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Requirements */}
            {order.customerDetails?.requirements && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card border-0 shadow-sm"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '1rem' }}>
                    <FileText size={20} className="me-2" />
                    Project Requirements
                  </h5>
                  <p style={{ color: '#374151', lineHeight: '1.7' }}>
                    {order.customerDetails.requirements}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Payment Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card border-0 shadow-sm mb-4"
              style={{ borderRadius: '20px' }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '1.5rem' }}>
                  Payment Summary
                </h5>
                
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <CreditCard size={20} className="text-muted me-2" />
                    <span style={{ fontWeight: '600', color: '#374151' }}>Total Amount</span>
                  </div>
                  <h4 style={{ color: '#1f2937', fontWeight: '900', margin: 0 }}>
                    ₹{order.amount?.toLocaleString()}
                  </h4>
                </div>
                
                {order.razorpayPaymentId && (
                  <div className="text-center">
                    <small className="text-muted">
                      Payment ID: {order.razorpayPaymentId}
                    </small>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Customer Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card border-0 shadow-sm"
              style={{ borderRadius: '20px' }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '1.5rem' }}>
                  Customer Information
                </h5>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <User size={16} className="text-muted me-2" />
                    <span style={{ fontWeight: '600', color: '#374151' }}>Name</span>
                  </div>
                  <p className="mb-0 ms-4">{order.customerDetails?.name}</p>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Mail size={16} className="text-muted me-2" />
                    <span style={{ fontWeight: '600', color: '#374151' }}>Email</span>
                  </div>
                  <p className="mb-0 ms-4">{order.customerDetails?.email}</p>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Phone size={16} className="text-muted me-2" />
                    <span style={{ fontWeight: '600', color: '#374151' }}>Phone</span>
                  </div>
                  <p className="mb-0 ms-4">{order.customerDetails?.phone}</p>
                </div>
                
                {order.customerDetails?.company && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <Building size={16} className="text-muted me-2" />
                      <span style={{ fontWeight: '600', color: '#374151' }}>Company</span>
                    </div>
                    <p className="mb-0 ms-4">{order.customerDetails.company}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;