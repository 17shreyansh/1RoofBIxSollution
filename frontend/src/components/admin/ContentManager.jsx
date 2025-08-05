import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Select, message, Tabs, Upload, Space } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import CodeEditor from '@uiw/react-textarea-code-editor';
import api from '../../utils/api';

const { Option } = Select;
const { TextArea } = Input;

const ContentManager = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedSection, setSelectedSection] = useState('hero');
  const [content, setContent] = useState({});

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'services', label: 'Services Page' },
    { value: 'portfolio', label: 'Portfolio Page' },
    { value: 'blog', label: 'Blog Page' },
    { value: 'contact', label: 'Contact Page' },
    { value: 'pricing', label: 'Pricing Page' }
  ];

  const sections = {
    home: ['hero', 'services', 'portfolio', 'testimonials', 'stats', 'cta'],
    about: ['hero', 'story', 'team', 'values', 'mission'],
    services: ['hero', 'overview', 'process'],
    portfolio: ['hero', 'categories'],
    blog: ['hero'],
    contact: ['hero', 'info'],
    pricing: ['hero', 'plans']
  };

  useEffect(() => {
    if (selectedPage && selectedSection) {
      fetchContent();
    }
  }, [selectedPage, selectedSection]);

  const fetchContent = async () => {
    try {
      const response = await api.get(`/content/${selectedPage}/${selectedSection}`);
      if (response.data.content) {
        setContent(response.data.content);
        form.setFieldsValue(response.data.content);
      } else {
        setContent({});
        form.resetFields();
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      await api.put(`/content/${selectedPage}/${selectedSection}`, {
        page: selectedPage,
        section: selectedSection,
        content: values,
        seo: values.seo
      });
      
      message.success('Content updated successfully!');
    } catch (error) {
      message.error('Error updating content');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    action: 'http://localhost:5000/api/upload',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const renderContentFields = () => {
    switch (selectedSection) {
      case 'hero':
        return (
          <>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Enter hero title" />
            </Form.Item>
            <Form.Item name="subtitle" label="Subtitle">
              <Input placeholder="Enter hero subtitle" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} placeholder="Enter description" />
            </Form.Item>
            <Form.Item name="ctaText" label="CTA Button Text">
              <Input placeholder="Get Started" />
            </Form.Item>
            <Form.Item name="ctaLink" label="CTA Button Link">
              <Input placeholder="/contact" />
            </Form.Item>
            <Form.Item name="backgroundImage" label="Background Image">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input placeholder="Image URL" />
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Space>
            </Form.Item>
          </>
        );
      case 'services':
        return (
          <>
            <Form.Item name="title" label="Section Title">
              <Input placeholder="Our Services" />
            </Form.Item>
            <Form.Item name="description" label="Section Description">
              <TextArea rows={4} placeholder="Enter section description" />
            </Form.Item>
          </>
        );
      default:
        return (
          <>
            <Form.Item name="title" label="Title">
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item name="content" label="Content">
              <TextArea rows={6} placeholder="Enter content" />
            </Form.Item>
          </>
        );
    }
  };

  const tabItems = [
    {
      key: 'content',
      label: 'Content',
      children: (
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
            <Select
              value={selectedPage}
              onChange={setSelectedPage}
              style={{ width: 200 }}
              placeholder="Select Page"
            >
              {pages.map(page => (
                <Option key={page.value} value={page.value}>{page.label}</Option>
              ))}
            </Select>
            <Select
              value={selectedSection}
              onChange={setSelectedSection}
              style={{ width: 200 }}
              placeholder="Select Section"
            >
              {sections[selectedPage]?.map(section => (
                <Option key={section} value={section}>{section.charAt(0).toUpperCase() + section.slice(1)}</Option>
              ))}
            </Select>
          </Space>
          
          {renderContentFields()}
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              Save Content
            </Button>
          </Form.Item>
        </Form>
      )
    },
    {
      key: 'seo',
      label: 'SEO Settings',
      children: (
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name={['seo', 'metaTitle']} label="Meta Title">
            <Input placeholder="Enter meta title" />
          </Form.Item>
          <Form.Item name={['seo', 'metaDescription']} label="Meta Description">
            <TextArea rows={3} placeholder="Enter meta description" />
          </Form.Item>
          <Form.Item name={['seo', 'keywords']} label="Keywords">
            <Select mode="tags" placeholder="Enter keywords">
            </Select>
          </Form.Item>
          <Form.Item name={['seo', 'ogImage']} label="Open Graph Image">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input placeholder="OG Image URL" />
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload OG Image</Button>
              </Upload>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              Save SEO Settings
            </Button>
          </Form.Item>
        </Form>
      )
    }
  ];

  return (
    <Card title="Content Management">
      <Tabs items={tabItems} />
    </Card>
  );
};

export default ContentManager;