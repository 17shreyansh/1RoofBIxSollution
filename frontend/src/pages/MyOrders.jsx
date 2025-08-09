import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, Package, CreditCard, Eye, User, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customer, logout } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/customer/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('customerToken')}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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

  return (
    <div style={{ minHeight: '100vh', paddingTop: '140px', background: '#f8fafc' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="row mb-5"
        >
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1f2937', fontFamily: 'Poppins, sans-serif' }}>
                  My Orders
                </h1>
                <p className="text-muted mb-0">Welcome back, {customer?.name || customer?.email}</p>
              </div>
              <div className="d-flex gap-3 mt-3 mt-md-0">
                <button
                  onClick={logout}
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                  style={{ borderRadius: '12px', padding: '0.75rem 1.5rem' }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
                <Link
                  to="/services"
                  className="btn d-flex align-items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                >
                  <Plus size={18} />
                  Browse Services
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-5"
          >
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', padding: '3rem' }}>
              <ShoppingBag size={80} className="text-muted mx-auto mb-4" />
              <h3 style={{ color: '#1f2937', fontWeight: '700' }}>No Orders Yet</h3>
              <p className="text-muted mb-4">You haven't placed any orders yet. Start exploring our services!</p>
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
                Browse Our Services
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="row">
            {orders.map((order, index) => (
              <div key={order._id} className="col-12 col-lg-6 mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: '20px', overflow: 'hidden' }}
                >
                  <div className="card-body p-4">
                    {/* Order Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '0.5rem' }}>
                          #{order.orderId.slice(-8)}
                        </h5>
                        <div className="d-flex align-items-center text-muted">
                          <Calendar size={16} className="me-2" />
                          <small>{new Date(order.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</small>
                        </div>
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

                    {/* Service Info */}
                    <div className="mb-3">
                      <h6 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {order.service?.name}
                      </h6>
                      <div className="d-flex align-items-center text-muted mb-2">
                        <Package size={16} className="me-2" />
                        <small className="text-capitalize">{order.packageType} Package</small>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center text-muted">
                        <CreditCard size={16} className="me-2" />
                        <span>Total Amount</span>
                      </div>
                      <h5 style={{ color: '#1f2937', fontWeight: '700', margin: 0 }}>
                        ₹{order.amount.toLocaleString()}
                      </h5>
                    </div>

                    {/* View Button */}
                    <Link
                      to={`/order/${order.orderId}`}
                      className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '0.75rem',
                        color: '#374151',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #f8fafc, #e2e8f0)';
                        e.target.style.color = '#374151';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                    >
                      <Eye size={18} />
                      View Details
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;