import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Card, 
  Row, 
  Col, 
  InputNumber, 
  message,
  Typography,
  Divider
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import api from '../../utils/api';

const { Title } = Typography;
const { TextArea } = Input;

const ServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);

  useEffect(() => {
    if (id && id !== 'new') {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await api.get(`/services/admin/${id}`);
      const serviceData = response.data;
      setService(serviceData);
      
      form.setFieldsValue({
        name: serviceData.name,
        category: serviceData.category,
        shortDescription: serviceData.shortDescription,
        description: serviceData.description,
        deliveryTime: serviceData.deliveryTime,
        order: serviceData.order,
        features: serviceData.features?.join('\n') || '',
        technologies: serviceData.technologies?.join('\n') || '',
        basicPrice: serviceData.pricing?.basic?.price || 0,
        basicFeatures: serviceData.pricing?.basic?.features?.join('\n') || '',
        standardPrice: serviceData.pricing?.standard?.price || 0,
        standardFeatures: serviceData.pricing?.standard?.features?.join('\n') || '',
        premiumPrice: serviceData.pricing?.premium?.price || 0,
        premiumFeatures: serviceData.pricing?.premium?.features?.join('\n') || ''
      });
    } catch (error) {
      message.error('Failed to fetch service');
      navigate('/admin/services');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const serviceData = {
        ...values,
        features: values.features ? values.features.split('\n').filter(f => f.trim()) : [],
        technologies: values.technologies ? values.technologies.split('\n').filter(t => t.trim()) : [],
        pricing: {
          basic: {
            price: values.basicPrice,
            features: values.basicFeatures ? values.basicFeatures.split('\n').filter(f => f.trim()) : []
          },
          standard: {
            price: values.standardPrice,
            features: values.standardFeatures ? values.standardFeatures.split('\n').filter(f => f.trim()) : []
          },
          premium: {
            price: values.premiumPrice,
            features: values.premiumFeatures ? values.premiumFeatures.split('\n').filter(f => f.trim()) : []
          }
        }
      };

      if (id === 'new') {
        await api.post('/services', serviceData);
        message.success('Service created successfully');
      } else {
        await api.put(`/services/${id}`, serviceData);
        message.success('Service updated successfully');
      }
      
      navigate('/admin/services');
    } catch (error) {
      message.error('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Development', 'Marketing', 'Design', 'Consulting', 'E-commerce', 'Mobile', 'SEO', 'Other'
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/admin/services')}
          style={{ marginBottom: '16px' }}
        >
          Back to Services
        </Button>
        <Title level={2}>{id === 'new' ? 'Create New Service' : 'Edit Service'}</Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: '1200px' }}
      >
        <Card title="Basic Information" style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="name"
                label="Service Name"
                rules={[{ required: true, message: 'Please enter service name' }]}
              >
                <Input placeholder="Enter service name" size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category" size="large">
                  {categories.map(cat => (
                    <Select.Option key={cat} value={cat}>{cat}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="shortDescription"
            label="Short Description"
            rules={[{ required: true, message: 'Please enter short description' }]}
          >
            <Input placeholder="Brief description for service cards" size="large" maxLength={100} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Full Description"
            rules={[{ required: true, message: 'Please enter full description' }]}
          >
            <TextArea rows={4} placeholder="Detailed description of the service" maxLength={500} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="deliveryTime"
                label="Delivery Time"
                rules={[{ required: true, message: 'Please enter delivery time' }]}
              >
                <Select placeholder="Select delivery time" size="large">
                  <Select.Option value="1-2 weeks">1-2 weeks</Select.Option>
                  <Select.Option value="2-4 weeks">2-4 weeks</Select.Option>
                  <Select.Option value="1-2 months">1-2 months</Select.Option>
                  <Select.Option value="2-3 months">2-3 months</Select.Option>
                  <Select.Option value="Ongoing">Ongoing</Select.Option>
                  <Select.Option value="Custom">Custom</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="order" label="Display Order">
                <InputNumber min={0} placeholder="0" style={{ width: '100%' }} size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Row gutter={16}>
          <Col span={12}>
            <Card title="Features" style={{ marginBottom: '24px' }}>
              <Form.Item name="features">
                <TextArea 
                  rows={8} 
                  placeholder="Responsive Design&#10;Modern Frameworks&#10;SEO Optimized&#10;Fast Loading"
                />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Technologies" style={{ marginBottom: '24px' }}>
              <Form.Item name="technologies">
                <TextArea 
                  rows={8} 
                  placeholder="React.js&#10;Node.js&#10;MongoDB&#10;Express.js"
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Card title="Pricing Plans" style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Title level={5}>Basic Plan</Title>
              <Form.Item name="basicPrice" label="Price (₹)">
                <InputNumber 
                  min={0} 
                  placeholder="29999" 
                  style={{ width: '100%' }}
                  formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/₹\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item name="basicFeatures" label="Features">
                <TextArea rows={4} placeholder="Up to 5 pages&#10;Responsive design&#10;Basic SEO" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Title level={5}>Standard Plan</Title>
              <Form.Item name="standardPrice" label="Price (₹)">
                <InputNumber 
                  min={0} 
                  placeholder="49999" 
                  style={{ width: '100%' }}
                  formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/₹\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item name="standardFeatures" label="Features">
                <TextArea rows={4} placeholder="Up to 10 pages&#10;Advanced features&#10;Complete SEO" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Title level={5}>Premium Plan</Title>
              <Form.Item name="premiumPrice" label="Price (₹)">
                <InputNumber 
                  min={0} 
                  placeholder="79999" 
                  style={{ width: '100%' }}
                  formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/₹\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item name="premiumFeatures" label="Features">
                <TextArea rows={4} placeholder="Unlimited pages&#10;Custom functionality&#10;E-commerce" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<SaveOutlined />}
            size="large"
          >
            {id === 'new' ? 'Create Service' : 'Update Service'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ServiceEdit;