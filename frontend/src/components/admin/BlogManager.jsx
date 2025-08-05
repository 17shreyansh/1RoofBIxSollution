import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, message, Space, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import api from '../../utils/api';

const { Option } = Select;
const { TextArea } = Input;

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/blog/admin');
      setPosts(response.data);
    } catch (error) {
      message.error('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingPost) {
        await api.put(`/blog/${editingPost._id}`, values);
        message.success('Post updated successfully');
      } else {
        await api.post('/blog', values);
        message.success('Post created successfully');
      }
      
      setModalVisible(false);
      form.resetFields();
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      message.error('Error saving post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    form.setFieldsValue(post);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blog/${id}`);
      message.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      message.error('Error deleting post');
    }
  };

  const columns = [
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
      title: 'Status',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished) => (
        <Tag color={isPublished ? 'green' : 'orange'}>
          {isPublished ? 'Published' : 'Draft'}
        </Tag>
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
          <Popconfirm title="Delete this post?" onConfirm={() => handleDelete(record._id)}>
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
        <h2>Blog Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingPost(null); form.resetFields(); setModalVisible(true); }}>
          Add Post
        </Button>
      </div>

      <Table columns={columns} dataSource={posts} rowKey="_id" loading={loading} />

      <Modal
        title={editingPost ? 'Edit Post' : 'Add Post'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); setEditingPost(null); }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="excerpt" label="Excerpt">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <TextArea rows={8} placeholder="Enter blog content" />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" />
          </Form.Item>
          <Form.Item name="isPublished" label="Published" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingPost ? 'Update' : 'Create'} Post
              </Button>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogManager;