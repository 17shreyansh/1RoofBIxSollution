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

const PortfolioManager = () => {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const response = await api.get('/portfolio/admin');
      setPortfolio(response.data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      message.error('Failed to fetch portfolio');
      setPortfolio([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/admin/portfolio/new');
  };

  const handleEdit = (project) => {
    navigate(`/admin/portfolio/${project._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/portfolio/${id}`);
      message.success('Project deleted successfully');
      fetchPortfolio();
    } catch (error) {
      message.error('Failed to delete project');
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await api.put(`/portfolio/${id}`, { isActive: !isActive });
      message.success(`Project ${!isActive ? 'activated' : 'deactivated'} successfully`);
      fetchPortfolio();
    } catch (error) {
      message.error('Failed to update project status');
    }
  };

  const handleToggleFeatured = async (id, isFeatured) => {
    try {
      await api.put(`/portfolio/${id}`, { isFeatured: !isFeatured });
      message.success(`Project ${!isFeatured ? 'featured' : 'unfeatured'} successfully`);
      fetchPortfolio();
    } catch (error) {
      message.error('Failed to update project featured status');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
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
      width: '20%',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
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
      render: (clientName) => clientName || 'N/A'
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleActive(record._id, isActive)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      )
    },
    {
      title: 'Featured',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (isFeatured, record) => (
        <Switch
          checked={isFeatured}
          onChange={() => handleToggleFeatured(record._id, isFeatured)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      )
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
            onClick={() => window.open(`/portfolio/${record.slug}`, '_blank')}
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
            title="Are you sure you want to delete this project?"
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
        <Title level={2}>Portfolio Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add New Project
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={portfolio}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} projects`
          }}
        />
      </Card>
    </div>
  );
};

export default PortfolioManager;