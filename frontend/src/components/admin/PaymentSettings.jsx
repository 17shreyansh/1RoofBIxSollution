import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { Shield, Key, Settings } from 'lucide-react';
import api from '../../utils/api';

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    keyId: '',
    keySecret: '',
    configured: false
  });
  const [formData, setFormData] = useState({
    keyId: '',
    keySecret: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/admin/settings/razorpay');
      setSettings(response.data);
      setFormData({
        keyId: response.data.keyId,
        keySecret: ''
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/admin/settings/razorpay', formData);
      setMessage({ type: 'success', text: 'Razorpay settings updated successfully!' });
      fetchSettings();
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Failed to update settings' 
      });
    } finally {
      setSaving(false);
    }
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
      <div className="d-flex align-items-center mb-4">
        <Settings className="me-2" size={24} />
        <h2 className="mb-0">Payment Settings</h2>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <Card>
            <Card.Header>
              <div className="d-flex align-items-center">
                <Shield className="me-2" size={20} />
                <h5 className="mb-0">Razorpay Configuration</h5>
              </div>
            </Card.Header>
            <Card.Body>
              {message.text && (
                <Alert variant={message.type} className="mb-4">
                  {message.text}
                </Alert>
              )}

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <div className={`badge ${settings.configured ? 'bg-success' : 'bg-warning'} me-2`}>
                    {settings.configured ? 'Configured' : 'Not Configured'}
                  </div>
                  {settings.configured && (
                    <small className="text-muted">
                      Razorpay integration is active and ready to process payments
                    </small>
                  )}
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex align-items-center">
                    <Key size={16} className="me-2" />
                    Razorpay Key ID
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.keyId}
                    onChange={(e) => setFormData({...formData, keyId: e.target.value})}
                    placeholder="rzp_test_xxxxxxxxxx or rzp_live_xxxxxxxxxx"
                    required
                  />
                  <Form.Text className="text-muted">
                    Your Razorpay Key ID (starts with rzp_test_ or rzp_live_)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <Shield size={16} className="me-2" />
                    Razorpay Key Secret
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.keySecret}
                    onChange={(e) => setFormData({...formData, keySecret: e.target.value})}
                    placeholder={settings.configured ? "Enter new secret to update" : "Enter your Razorpay Key Secret"}
                    required={!settings.configured}
                  />
                  <Form.Text className="text-muted">
                    Your Razorpay Key Secret (will be encrypted and stored securely)
                  </Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={saving}
                  className="d-flex align-items-center"
                >
                  {saving ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Shield size={16} className="me-2" />
                      {settings.configured ? 'Update Settings' : 'Save Settings'}
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-4">
          <Card className="bg-light">
            <Card.Header>
              <h6 className="mb-0">Security Information</h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6 className="text-success">
                  <Shield size={16} className="me-1" />
                  Secure Storage
                </h6>
                <small className="text-muted">
                  Your Razorpay Key Secret is encrypted using AES-256 encryption before being stored in the database.
                </small>
              </div>

              <div className="mb-3">
                <h6 className="text-info">
                  <Key size={16} className="me-1" />
                  API Access
                </h6>
                <small className="text-muted">
                  Only authorized admin users can view and modify these settings.
                </small>
              </div>

              <div>
                <h6 className="text-warning">
                  <Settings size={16} className="me-1" />
                  Environment
                </h6>
                <small className="text-muted">
                  Use test keys for development and live keys for production.
                </small>
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>
              <h6 className="mb-0">How to Get Keys</h6>
            </Card.Header>
            <Card.Body>
              <ol className="small">
                <li>Login to your Razorpay Dashboard</li>
                <li>Go to Settings → API Keys</li>
                <li>Generate or copy your Key ID and Key Secret</li>
                <li>Paste them in the form above</li>
              </ol>
              <a 
                href="https://dashboard.razorpay.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                Open Razorpay Dashboard
              </a>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;