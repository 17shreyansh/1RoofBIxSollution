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
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined
} from '@ant-design/icons';
import api from '../../utils/api';

const { Title } = Typography;

const ServiceManager = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get('/services/admin');
      setServices(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      message.error('Failed to fetch services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/admin/services/new');
  };

  const handleEdit = (service) => {
    navigate(`/admin/services/${service._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      message.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      message.error('Failed to delete service');
    }
  };



  const handleToggleActive = async (id, isActive) => {
    try {
      await api.put(`/services/${id}`, { isActive: !isActive });
      message.success(`Service ${!isActive ? 'activated' : 'deactivated'} successfully`);
      fetchServices();
    } catch (error) {
      message.error('Failed to update service status');
    }
  };

  const handleToggleFeatured = async (id, isFeatured) => {
    try {
      await api.put(`/services/${id}`, { isFeatured: !isFeatured });
      message.success(`Service ${!isFeatured ? 'featured' : 'unfeatured'} successfully`);
      fetchServices();
    } catch (error) {
      message.error('Failed to update service featured status');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
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
      render: (time) => <Tag color="green">{time}</Tag>
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
            onClick={() => window.open(`/services/${record.slug}`, '_blank')}
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
            title="Are you sure you want to delete this service?"
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
        <Title level={2}>Service Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add New Service
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={services}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} services`
          }}
        />
      </Card>


    </div>
  );
};



export default ServiceManager;