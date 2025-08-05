import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  Button, 
  message, 
  Space, 
  Tag, 
  Popconfirm,
  Card,
  Switch,
  Typography,
  Image
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined 
} from '@ant-design/icons';
import api from '../../utils/api';

const { Title } = Typography;

const BlogManager = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/blog/admin');
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      message.error('Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/admin/blog/new');
  };

  const handleEdit = (blog) => {
    navigate(`/admin/blog/${blog._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blog/${id}`);
      message.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Failed to delete blog');
    }
  };

  const handleTogglePublished = async (id, isPublished) => {
    try {
      await api.put(`/blog/${id}`, { isPublished: !isPublished });
      message.success(`Blog ${!isPublished ? 'published' : 'unpublished'} successfully`);
      fetchBlogs();
    } catch (error) {
      message.error('Failed to update blog status');
    }
  };

  const columns = [
    {
      title: 'Featured Image',
      dataIndex: 'featuredImage',
      key: 'featuredImage',
      width: '80px',
      render: (image) => (
        image ? (
          <Image
            width={60}
            height={40}
            src={image}
            style={{ objectFit: 'cover', borderRadius: '4px' }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
          />
        ) : (
          <div style={{ width: 60, height: 40, background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            No Image
          </div>
        )
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => {
        if (!tags || tags.length === 0) return <span style={{ color: '#999' }}>No tags</span>;
        
        const tagArray = Array.isArray(tags) ? tags : [tags];
        
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {tagArray.slice(0, 3).map((tag, index) => (
              <Tag key={index} color="blue" style={{ margin: 0 }}>
                {tag}
              </Tag>
            ))}
            {tagArray.length > 3 && (
              <Tag color="default" style={{ margin: 0 }}>+{tagArray.length - 3}</Tag>
            )}
          </div>
        );
      }
    },
    {
      title: 'Published',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished, record) => (
        <Switch
          checked={isPublished}
          onChange={() => handleTogglePublished(record._id, isPublished)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      )
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => window.open(`/blog/${record.slug}`, '_blank')}
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Blog Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add New Blog
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} blogs`
          }}
        />
      </Card>
    </div>
  );
};

export default BlogManager;