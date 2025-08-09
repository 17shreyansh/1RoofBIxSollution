import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Rate, message, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../utils/api';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/testimonials');
      setTestimonials(response.data || []);
    } catch (error) {
      message.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, values);
        message.success('Testimonial updated successfully');
      } else {
        await api.post('/testimonials', values);
        message.success('Testimonial created successfully');
      }
      setModalVisible(false);
      setEditingTestimonial(null);
      form.resetFields();
      fetchTestimonials();
    } catch (error) {
      message.error('Failed to save testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    form.setFieldsValue(testimonial);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
      message.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      message.error('Failed to delete testimonial');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled value={rating} />,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text) => text?.substring(0, 100) + (text?.length > 100 ? '...' : ''),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this testimonial?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Testimonials Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingTestimonial(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Testimonial
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={testimonials}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingTestimonial(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input placeholder="Enter client name" />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: false, message: 'Please enter the company' }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please select a rating' }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="content"
            label="Testimonial Content"
            rules={[{ required: true, message: 'Please enter the testimonial content' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter testimonial content"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTestimonial ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => {
                setModalVisible(false);
                setEditingTestimonial(null);
                form.resetFields();
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TestimonialManager;