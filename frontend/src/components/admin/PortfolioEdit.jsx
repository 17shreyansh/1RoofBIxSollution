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
  Upload,
  Image,
  Space
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../utils/api';

const { Title } = Typography;
const { TextArea } = Input;

const PortfolioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);
  const [galleryFileList, setGalleryFileList] = useState([]);

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPortfolio();
    }
  }, [id]);

  const fetchPortfolio = async () => {
    try {
      const response = await api.get(`/portfolio/admin/${id}`);
      const portfolioData = response.data;
      setPortfolio(portfolioData);
      
      // Set form values
      form.setFieldsValue({
        title: portfolioData.title,
        category: portfolioData.category,
        shortDescription: portfolioData.shortDescription,
        description: portfolioData.description,
        services: portfolioData.services?.join('\n') || '',
        technologies: portfolioData.technologies?.join('\n') || '',
        clientName: portfolioData.client?.name || '',
        clientWebsite: portfolioData.client?.website || '',
        projectUrl: portfolioData.projectUrl,
        order: portfolioData.order,
        metrics: portfolioData.results?.metrics?.map(m => `${m.label}: ${m.value} (${m.improvement})`).join('\n') || ''
      });

      // Set image file lists for preview
      if (portfolioData.image) {
        setImageFileList([{
          uid: '-1',
          name: 'image.jpg',
          status: 'done',
          url: portfolioData.image,
        }]);
      }

      if (portfolioData.gallery) {
        setGalleryFileList(portfolioData.gallery.map((img, index) => ({
          uid: `-${index + 2}`,
          name: `gallery-${index + 1}.jpg`,
          status: 'done',
          url: img,
        })));
      }
    } catch (error) {
      message.error('Failed to fetch portfolio');
      navigate('/admin/portfolio');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Basic fields
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('shortDescription', values.shortDescription);
      formData.append('description', values.description);
      formData.append('projectUrl', values.projectUrl || '');
      formData.append('order', values.order || 0);
      
      // Array fields
      const services = values.services ? values.services.split('\n').filter(s => s.trim()) : [];
      const technologies = values.technologies ? values.technologies.split('\n').filter(t => t.trim()) : [];
      formData.append('services', JSON.stringify(services));
      formData.append('technologies', JSON.stringify(technologies));
      
      // Client object
      const client = {
        name: values.clientName || '',
        website: values.clientWebsite || ''
      };
      formData.append('client', JSON.stringify(client));
      
      // Results object
      const metrics = values.metrics ? values.metrics.split('\n').map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const label = parts[0].trim();
          const rest = parts.slice(1).join(':').trim();
          const valueParts = rest.split('(');
          const value = valueParts[0].trim();
          const improvement = valueParts[1] ? valueParts[1].replace(')', '').trim() : '';
          return { label, value, improvement };
        }
        return null;
      }).filter(Boolean) : [];
      
      const results = { metrics };
      formData.append('results', JSON.stringify(results));
      
      // Handle image uploads
      imageFileList.forEach(file => {
        if (file.originFileObj) {
          formData.append('image', file.originFileObj);
        }
      });
      
      galleryFileList.forEach(file => {
        if (file.originFileObj) {
          formData.append('gallery', file.originFileObj);
        }
      });

      if (id === 'new') {
        await api.post('/portfolio', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Portfolio created successfully');
      } else {
        await api.put(`/portfolio/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Portfolio updated successfully');
      }
      
      navigate('/admin/portfolio');
    } catch (error) {
      message.error('Failed to save portfolio');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Web Development', 'Mobile Development', 'Design', 'Marketing', 'E-commerce', 'Branding', 'SEO', 'Other'
  ];

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/admin/portfolio')}
          style={{ marginBottom: '16px' }}
        >
          Back to Portfolio
        </Button>
        <Title level={2}>{id === 'new' ? 'Create New Portfolio' : 'Edit Portfolio'}</Title>
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
                name="title"
                label="Project Title"
                rules={[{ required: true, message: 'Please enter project title' }]}
              >
                <Input placeholder="Enter project title" size="large" />
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
            <Input placeholder="Brief description for portfolio cards" size="large" maxLength={100} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Full Description"
            rules={[{ required: true, message: 'Please enter full description' }]}
          >
            <TextArea rows={4} placeholder="Detailed description of the project" maxLength={500} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="projectUrl" label="Project URL">
                <Input placeholder="https://project-demo.com" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="order" label="Display Order">
                <InputNumber min={0} placeholder="0" style={{ width: '100%' }} size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Images" style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Main Image">
                <Upload
                  listType="picture-card"
                  fileList={imageFileList}
                  onChange={({ fileList }) => setImageFileList(fileList)}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  {imageFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gallery Images">
                <Upload
                  listType="picture-card"
                  fileList={galleryFileList}
                  onChange={({ fileList }) => setGalleryFileList(fileList)}
                  beforeUpload={() => false}
                  multiple
                  maxCount={10}
                >
                  {galleryFileList.length >= 10 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Client Information" style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="clientName" label="Client Name">
                <Input placeholder="Client company name" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="clientWebsite" label="Client Website">
                <Input placeholder="https://client-website.com" size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Row gutter={16}>
          <Col span={12}>
            <Card title="Services Provided" style={{ marginBottom: '24px' }}>
              <Form.Item name="services">
                <TextArea 
                  rows={6} 
                  placeholder="Web Development&#10;UI/UX Design&#10;E-commerce&#10;SEO Optimization"
                />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Technologies Used" style={{ marginBottom: '24px' }}>
              <Form.Item name="technologies">
                <TextArea 
                  rows={6} 
                  placeholder="React.js&#10;Node.js&#10;MongoDB&#10;AWS"
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Card title="Project Results" style={{ marginBottom: '24px' }}>
          <Form.Item name="metrics" label="Metrics & Results">
            <TextArea 
              rows={4} 
              placeholder="Sales Increase: 250% (+150%)&#10;Page Load Speed: 1.2s (60% faster)&#10;User Engagement: 85% (+200%)"
            />
          </Form.Item>
        </Card>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<SaveOutlined />}
            size="large"
          >
            {id === 'new' ? 'Create Portfolio' : 'Update Portfolio'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PortfolioEdit;