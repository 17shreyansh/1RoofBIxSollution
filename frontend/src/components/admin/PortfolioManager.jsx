import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, Upload, message, Space, Popconfirm, Tag, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import api from '../../utils/api';

const { Option } = Select;
const { TextArea } = Input;

const PortfolioManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/portfolio/admin');
      setProjects(response.data);
    } catch (error) {
      message.error('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingProject) {
        await api.put(`/portfolio/${editingProject._id}`, values);
        message.success('Project updated successfully');
      } else {
        await api.post('/portfolio', values);
        message.success('Project created successfully');
      }
      
      setModalVisible(false);
      form.resetFields();
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      message.error('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    form.setFieldsValue(project);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/portfolio/${id}`);
      message.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      message.error('Error deleting project');
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>
    },
    {
      title: 'Client',
      dataIndex: ['client', 'name'],
      key: 'client',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Switch
          checked={isActive}
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete this project?" onConfirm={() => handleDelete(record._id)}>
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2>Portfolio Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingProject(null); form.resetFields(); setModalVisible(true); }}>
          Add Project
        </Button>
      </div>

      <Table columns={columns} dataSource={projects} rowKey="_id" loading={loading} />

      <Modal
        title={editingProject ? 'Edit Project' : 'Add Project'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); setEditingProject(null); }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Project Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="shortDescription" label="Short Description">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="description" label="Full Description">
            <TextArea rows={4} placeholder="Enter full description" />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Option value="web-development">Web Development</Option>
              <Option value="mobile-development">Mobile Development</Option>
              <Option value="design">Design</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['client', 'name']} label="Client Name">
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingProject ? 'Update' : 'Create'} Project
              </Button>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PortfolioManager;