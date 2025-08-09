import { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge, Table } from 'react-bootstrap';
import api from '../../utils/api';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({ status: '', adminNotes: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      if (statusFilter) params.append('status', statusFilter);
      
      const response = await api.get(`/admin/orders?${params}`);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await api.put(`/admin/orders/${selectedOrder._id}/status`, statusUpdate);
      setShowModal(false);
      fetchOrders();
      setStatusUpdate({ status: '', adminNotes: '' });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'warning',
      paid: 'success',
      processing: 'info',
      completed: 'primary',
      cancelled: 'danger',
      refunded: 'secondary'
    };
    return statusClasses[status] || 'secondary';
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setStatusUpdate({ status: order.status, adminNotes: order.adminNotes || '' });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
        <div className="d-flex gap-2">
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </Form.Select>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <code>{order.orderId}</code>
                  </td>
                  <td>
                    <div>
                      <div className="fw-bold">{order.user?.name || order.customerDetails?.name}</div>
                      <small className="text-muted">{order.user?.email || order.customerDetails?.email}</small>
                    </div>
                  </td>
                  <td>{order.service?.name}</td>
                  <td>
                    <span className="text-capitalize">{order.packageType}</span>
                  </td>
                  <td>₹{order.amount}</td>
                  <td>
                    <Badge bg={getStatusBadge(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => openStatusModal(order)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {orders.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No orders found</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <div className="mb-3">
                <strong>Order:</strong> {selectedOrder.orderId}
              </div>
              <div className="mb-3">
                <strong>Customer:</strong> {selectedOrder.customerDetails?.name} ({selectedOrder.customerDetails?.email})
              </div>
              <div className="mb-3">
                <strong>Service:</strong> {selectedOrder.service?.name} - {selectedOrder.packageType}
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={statusUpdate.status}
                  onChange={(e) => setStatusUpdate({...statusUpdate, status: e.target.value})}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Admin Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={statusUpdate.adminNotes}
                  onChange={(e) => setStatusUpdate({...statusUpdate, adminNotes: e.target.value})}
                  placeholder="Add notes about this order..."
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Update Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManager;