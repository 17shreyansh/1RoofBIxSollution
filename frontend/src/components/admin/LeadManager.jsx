import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message, 
  Space, 
  Tag, 
  Popconfirm,
  Card,
  Row,
  Col,
  Typography,
  Drawer,
  Descriptions,
  Badge
} from 'antd';
import { 
  EyeOutlined, 
  DeleteOutlined, 
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined
} from '@ant-design/icons';
import api from '../../utils/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const LeadManager = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get('/leads');
      setLeads(response.data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Mock data for development
      setLeads([
        {
          _id: '1',
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          company: 'Tech Solutions Inc.',
          service: 'Web Development',
          type: 'contact',
          message: 'I need a modern website for my business. Looking for responsive design with e-commerce functionality.',
          budget: '$5,000 - $10,000',
          timeline: '2-3 months',
          status: 'new',
          source: 'Website Contact Form',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          _id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.j@company.com',
          phone: '+1 (555) 987-6543',
          company: 'Marketing Pro',
          service: 'Digital Marketing',
          type: 'quote',
          message: 'Need comprehensive digital marketing strategy including SEO and PPC campaigns.',
          budget: '$2,000 - $5,000',
          timeline: 'ASAP',
          status: 'in-progress',
          source: 'Services Page',
          createdAt: '2024-01-14T14:20:00Z',
          updatedAt: '2024-01-14T16:45:00Z'
        },
        {
          _id: '3',
          name: 'Mike Davis',
          email: 'mike@startup.io',
          phone: '+1 (555) 456-7890',
          company: 'StartupXYZ',
          service: 'Brand Design',
          type: 'consultation',
          message: 'Looking for complete brand identity design for our new startup.',
          budget: '$3,000 - $7,000',
          timeline: '1 month',
          status: 'replied',
          source: 'Portfolio Page',
          createdAt: '2024-01-13T09:15:00Z',
          updatedAt: '2024-01-13T11:30:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setDetailVisible(true);
  };

  const handleStatusChange = (lead) => {
    setSelectedLead(lead);
    form.setFieldsValue({ status: lead.status });
    setStatusModalVisible(true);
  };

  const handleUpdateStatus = async (values) => {
    try {
      await api.put(`/leads/${selectedLead._id}`, values);
      message.success('Lead status updated successfully');
      setStatusModalVisible(false);
      fetchLeads();
    } catch (error) {
      message.error('Failed to update lead status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/leads/${id}`);
      message.success('Lead deleted successfully');
      fetchLeads();
    } catch (error) {
      message.error('Failed to delete lead');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': 'green',
      'in-progress': 'blue',
      'replied': 'purple',
      'converted': 'cyan',
      'closed': 'red'
    };
    return colors[status] || 'default';
  };

  const getTypeColor = (type) => {
    const colors = {
      'contact': 'blue',
      'quote': 'orange',
      'consultation': 'green',
      'support': 'purple'
    };
    return colors[type] || 'default';
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.company}</Text>
        </div>
      )
    },
    {
      title: 'Contact',
      key: 'contact',
      width: '20%',
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: 4 }}>
            <MailOutlined style={{ marginRight: 4, color: '#1890ff' }} />
            <Text copyable={{ text: record.email }}>{record.email}</Text>
          </div>
          {record.phone && (
            <div>
              <PhoneOutlined style={{ marginRight: 4, color: '#52c41a' }} />
              <Text copyable={{ text: record.phone }}>{record.phone}</Text>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (service) => <Tag color="blue">{service}</Tag>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color={getTypeColor(type)}>{type.toUpperCase()}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Tag 
          color={getStatusColor(status)} 
          style={{ cursor: 'pointer' }}
          onClick={() => handleStatusChange(record)}
        >
          {status.replace('-', ' ').toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => budget || 'Not specified'
    },
    {
      title: 'Date',
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
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
          <Button
            icon={<MailOutlined />}
            size="small"
            onClick={() => window.open(`mailto:${record.email}`, '_blank')}
          >
            Email
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this lead?"
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

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'replied', label: 'Replied' },
    { value: 'converted', label: 'Converted' },
    { value: 'closed', label: 'Closed' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Lead Management</Title>
        <Space>
          <Button onClick={fetchLeads}>Refresh</Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {leads.filter(l => l.status === 'new').length}
              </div>
              <div>New Leads</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {leads.filter(l => l.status === 'in-progress').length}
              </div>
              <div>In Progress</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>
                {leads.filter(l => l.status === 'replied').length}
              </div>
              <div>Replied</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#13c2c2' }}>
                {leads.filter(l => l.status === 'converted').length}
              </div>
              <div>Converted</div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={leads}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} leads`
          }}
        />
      </Card>

      {/* Lead Details Drawer */}
      <Drawer
        title="Lead Details"
        placement="right"
        onClose={() => setDetailVisible(false)}
        open={detailVisible}
        width={600}
      >
        {selectedLead && (
          <div>
            <Descriptions title="Contact Information" bordered column={1}>
              <Descriptions.Item label="Name">{selectedLead.name}</Descriptions.Item>
              <Descriptions.Item label="Email">
                <Text copyable>{selectedLead.email}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <Text copyable>{selectedLead.phone || 'Not provided'}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Company">{selectedLead.company || 'Not provided'}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Project Information" bordered column={1} style={{ marginTop: 24 }}>
              <Descriptions.Item label="Service">{selectedLead.service}</Descriptions.Item>
              <Descriptions.Item label="Type">
                <Tag color={getTypeColor(selectedLead.type)}>{selectedLead.type.toUpperCase()}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Budget">{selectedLead.budget || 'Not specified'}</Descriptions.Item>
              <Descriptions.Item label="Timeline">{selectedLead.timeline || 'Not specified'}</Descriptions.Item>
              <Descriptions.Item label="Source">{selectedLead.source || 'Unknown'}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Status & Dates" bordered column={1} style={{ marginTop: 24 }}>
              <Descriptions.Item label="Status">
                <Badge 
                  status={selectedLead.status === 'new' ? 'success' : 'processing'} 
                  text={selectedLead.status.replace('-', ' ').toUpperCase()}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Created">
                {new Date(selectedLead.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {new Date(selectedLead.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={4}>Message</Title>
              <Card>
                <Text>{selectedLead.message}</Text>
              </Card>
            </div>

            <div style={{ marginTop: 24 }}>
              <Space>
                <Button 
                  type="primary" 
                  icon={<MailOutlined />}
                  onClick={() => window.open(`mailto:${selectedLead.email}`, '_blank')}
                >
                  Send Email
                </Button>
                <Button 
                  icon={<PhoneOutlined />}
                  onClick={() => window.open(`tel:${selectedLead.phone}`, '_blank')}
                  disabled={!selectedLead.phone}
                >
                  Call
                </Button>
                <Button onClick={() => handleStatusChange(selectedLead)}>
                  Update Status
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Drawer>

      {/* Status Update Modal */}
      <Modal
        title="Update Lead Status"
        open={statusModalVisible}
        onCancel={() => setStatusModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateStatus}
        >
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              {statusOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes (Optional)"
          >
            <TextArea rows={3} placeholder="Add any notes about this status change" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update Status
              </Button>
              <Button onClick={() => setStatusModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeadManager;