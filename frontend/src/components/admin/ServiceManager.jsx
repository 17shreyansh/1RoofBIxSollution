import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Upload, 
  message, 
  Space, 
  Popconfirm,
  Tag,
  Image
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';

import api from '../../utils/api';

const { Option } = Select;
const { TextArea } = Input;

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get('/services/admin');
      setServices(response.data);
    } catch (error) {
      message.error('Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (key === 'features' || key === 'pricing') {
          formData.append(key, JSON.stringify(values[key]));
        } else if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      if (editingService) {
        await api.put(`/services/${editingService._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Service updated successfully');
      } else {
        await api.post('/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Service created successfully');
      }
      
      setModalVisible(false);
      form.resetFields();
      setEditingService(null);
      fetchServices();
    } catch (error) {
      message.error('Error saving service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    form.setFieldsValue({
      ...service,
      features: service.features || [],
      pricing: service.pricing || { basic: {}, standard: {}, premium: {} }
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      message.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      message.error('Error deleting service');
    }
  };

  const toggleStatus = async (id, isActive) => {
    try {
      await api.put(`/services/${id}`, { isActive: !isActive });
      message.success('Service status updated');
      fetchServices();
    } catch (error) {
      message.error('Error updating service status');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => image ? <Image width={50} src={image} /> : 'No image'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>
    },
    {
      title: 'Delivery Time',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => toggleStatus(record._id, isActive)}
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
        />
      )
    },
    {
      title: 'Featured',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (isFeatured) => isFeatured ? <Tag color="gold">Featured</Tag> : null
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this service?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="primary" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const uploadProps = {
    name: 'file',
    action: 'http://localhost:5000/api/upload',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      return isImage;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        form.setFieldsValue({ image: info.file.response.url });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2>Service Management</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingService(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Service
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingService ? 'Edit Service' : 'Add Service'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingService(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item name="name" label="Service Name" rules={[{ required: true }]}>
            <Input placeholder="Enter service name" />
          </Form.Item>

          <Form.Item name="shortDescription" label="Short Description">
            <TextArea rows={2} placeholder="Brief description for cards" />
          </Form.Item>

          <Form.Item name="description" label="Full Description" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Enter full description" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select category">
              <Option value="web-development">Web Development</Option>
              <Option value="mobile-development">Mobile Development</Option>
              <Option value="digital-marketing">Digital Marketing</Option>
              <Option value="design">Design</Option>
              <Option value="consulting">Consulting</Option>
            </Select>
          </Form.Item>

          <Form.Item name="deliveryTime" label="Delivery Time">
            <Input placeholder="e.g., 2-3 weeks" />
          </Form.Item>

          <Form.Item name="features" label="Features">
            <Select mode="tags" placeholder="Add features">
            </Select>
          </Form.Item>

          <Form.Item name="image" label="Service Image">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input placeholder="Image URL" />
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Space>
          </Form.Item>

          <Form.Item name="icon" label="Icon">
            <Input placeholder="Icon name or URL" />
          </Form.Item>

          <Form.Item name="isFeatured" label="Featured Service" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="isActive" label="Active" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>

          <Form.Item name="order" label="Display Order">
            <Input type="number" placeholder="0" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingService ? 'Update' : 'Create'} Service
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManager;