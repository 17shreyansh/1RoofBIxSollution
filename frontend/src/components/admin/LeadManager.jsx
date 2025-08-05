import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Tag, 
  Space, 
  message,
  Drawer,
  Typography,
  Card,
  Divider,
  Badge
} from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  DownloadOutlined,
  MessageOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import api from '../../utils/api';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const LeadManager = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get('/leads/admin', { params: filters });
      setLeads(response.data);
    } catch (error) {
      message.error('Error fetching leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (leadId, status) => {
    try {
      await api.put(`/leads/${leadId}`, { status });
      message.success('Lead status updated');
      fetchLeads();
    } catch (error) {
      message.error('Error updating lead status');
    }
  };

  const handleAddNote = async (values) => {
    try {
      await api.post(`/leads/${selectedLead._id}/notes`, values);
      message.success('Note added successfully');
      form.resetFields();
      setEditModalVisible(false);
      fetchLeads();
    } catch (error) {
      message.error('Error adding note');
    }
  };

  const exportToCSV = async () => {
    try {
      const response = await api.get('/leads/export', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads-${dayjs().format('YYYY-MM-DD')}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      message.success('Leads exported successfully');
    } catch (error) {
      message.error('Error exporting leads');
    }
  };

  const statusColors = {
    new: 'green',
    'in-progress': 'blue',
    replied: 'purple',
    converted: 'cyan',
    closed: 'red'
  };

  const priorityColors = {
    low: 'default',
    medium: 'warning',
    high: 'error'
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <UserOutlined />
          <span>{name}</span>
          {record.priority === 'high' && <Badge status="error" />}
        </Space>
      )
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space size="small">
            <MailOutlined />
            <Text copyable>{record.email}</Text>
          </Space>
          {record.phone && (
            <Space size="small">
              <PhoneOutlined />
              <Text copyable>{record.phone}</Text>
            </Space>
          )}
        </Space>
      )
    },
    {
      title: 'Service/Product',
      key: 'serviceProduct',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          {record.service && <Tag color="blue">{record.service}</Tag>}
          {record.product && <Tag color="green">{record.product}</Tag>}
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag>{type.toUpperCase()}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusUpdate(record._id, value)}
        >
          <Option value="new">New</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="replied">Replied</Option>
          <Option value="converted">Converted</Option>
          <Option value="closed">Closed</Option>
        </Select>
      )
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Badge status={priorityColors[priority]} text={priority.toUpperCase()} />
      )
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {dayjs(date).format('MMM DD, YYYY')}
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedLead(record);
              setDetailsVisible(true);
            }}
          >
            View
          </Button>
          <Button 
            size="small" 
            icon={<MessageOutlined />}
            onClick={() => {
              setSelectedLead(record);
              setEditModalVisible(true);
            }}
          >
            Note
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Lead Management</Title>
        <Space>
          <Select
            placeholder="Filter by Status"
            style={{ width: 150 }}
            allowClear
            onChange={(value) => setFilters({ ...filters, status: value })}
          >
            <Option value="new">New</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="replied">Replied</Option>
            <Option value="converted">Converted</Option>
            <Option value="closed">Closed</Option>
          </Select>
          <Select
            placeholder="Filter by Type"
            style={{ width: 150 }}
            allowClear
            onChange={(value) => setFilters({ ...filters, type: value })}
          >
            <Option value="contact">Contact</Option>
            <Option value="quote">Quote</Option>
            <Option value="product">Product</Option>
            <Option value="consultation">Consultation</Option>
          </Select>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={exportToCSV}
          >
            Export CSV
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={leads}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        onChange={() => fetchLeads()}
      />

      <Drawer
        title="Lead Details"
        placement="right"
        width={600}
        open={detailsVisible}
        onClose={() => setDetailsVisible(false)}
      >
        {selectedLead && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Contact Information">
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div><strong>Name:</strong> {selectedLead.name}</div>
                <div><strong>Email:</strong> {selectedLead.email}</div>
                {selectedLead.phone && <div><strong>Phone:</strong> {selectedLead.phone}</div>}
                {selectedLead.company && <div><strong>Company:</strong> {selectedLead.company}</div>}
              </Space>
            </Card>

            <Card title="Inquiry Details">
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div><strong>Type:</strong> <Tag>{selectedLead.type}</Tag></div>
                <div><strong>Status:</strong> <Tag color={statusColors[selectedLead.status]}>{selectedLead.status}</Tag></div>
                <div><strong>Priority:</strong> <Badge status={priorityColors[selectedLead.priority]} text={selectedLead.priority} /></div>
                {selectedLead.service && <div><strong>Service:</strong> {selectedLead.service}</div>}
                {selectedLead.product && <div><strong>Product:</strong> {selectedLead.product}</div>}
                {selectedLead.budget && <div><strong>Budget:</strong> {selectedLead.budget}</div>}
                {selectedLead.timeline && <div><strong>Timeline:</strong> {selectedLead.timeline}</div>}
                <div><strong>Date:</strong> {dayjs(selectedLead.createdAt).format('MMMM DD, YYYY HH:mm')}</div>
              </Space>
            </Card>

            {selectedLead.message && (
              <Card title="Message">
                <Text>{selectedLead.message}</Text>
              </Card>
            )}

            {selectedLead.notes && selectedLead.notes.length > 0 && (
              <Card title="Notes">
                {selectedLead.notes.map((note, index) => (
                  <div key={index} style={{ marginBottom: 8, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
                    <Text>{note.content}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {dayjs(note.addedAt).format('MMM DD, YYYY HH:mm')}
                    </Text>
                  </div>
                ))}
              </Card>
            )}
          </Space>
        )}
      </Drawer>

      <Modal
        title="Add Note"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddNote}>
          <Form.Item name="content" label="Note" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Add your note here..." />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Note
              </Button>
              <Button onClick={() => setEditModalVisible(false)}>
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