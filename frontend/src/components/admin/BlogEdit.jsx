import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Card, 
  Row, 
  Col, 
  message,
  Typography,
  Upload,
  Switch,
  Space,
  Tag
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Embed from '@editorjs/embed';
import api from '../../utils/api';

const { Title } = Typography;
const { TextArea } = Input;

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeEditor();
      if (id && id !== 'new') {
        fetchBlog();
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy();
      }
    };
  }, [id]);

  const initializeEditor = () => {
    if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
      editorInstance.current.destroy();
    }

    const editorElement = document.getElementById('editorjs');
    if (!editorElement) {
      console.error('Editor element not found');
      return;
    }

    editorInstance.current = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        code: {
          class: Code,
          shortcut: 'CMD+SHIFT+C'
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: '/api/blog/fetchUrl',
          }
        },
        delimiter: Delimiter,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: true,
            }
          }
        }
      },
      placeholder: 'Start writing your blog post...',
      autofocus: true,
    });
  };

  const fetchBlog = async () => {
    try {
      const response = await api.get(`/blog/admin/${id}`);
      const blogData = response.data;
      setBlog(blogData);
      
      // Set form values
      form.setFieldsValue({
        title: blogData.title,
        slug: blogData.slug,
        category: blogData.category,
        excerpt: blogData.excerpt,
        isPublished: blogData.isPublished,
        isFeatured: blogData.isFeatured
      });

      // Set tags
      if (blogData.tags && Array.isArray(blogData.tags)) {
        setTags(blogData.tags);
      }

      // Set featured image
      if (blogData.featuredImage) {
        setImageFileList([{
          uid: '-1',
          name: 'featured-image.jpg',
          status: 'done',
          url: blogData.featuredImage,
        }]);
      }

      // Load content into editor
      if (blogData.content && editorInstance.current) {
        try {
          let contentData;
          if (typeof blogData.content === 'string') {
            // Check if it's HTML or JSON
            if (blogData.content.trim().startsWith('<')) {
              // It's HTML, convert to EditorJS format
              contentData = {
                blocks: [{
                  type: 'paragraph',
                  data: { text: blogData.content }
                }]
              };
            } else {
              contentData = JSON.parse(blogData.content);
            }
          } else {
            contentData = blogData.content;
          }
          
          setTimeout(() => {
            if (editorInstance.current && typeof editorInstance.current.render === 'function') {
              editorInstance.current.render(contentData);
            }
          }, 500);
        } catch (error) {
          console.error('Error loading editor content:', error);
        }
      }
    } catch (error) {
      message.error('Failed to fetch blog');
      navigate('/admin/blog');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Get content from editor
      let editorData = { blocks: [] };
      if (editorInstance.current && typeof editorInstance.current.save === 'function') {
        editorData = await editorInstance.current.save();
      }
      
      const formData = new FormData();
      
      // Basic fields
      formData.append('title', values.title);
      formData.append('slug', values.slug || values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      formData.append('category', values.category);
      formData.append('excerpt', values.excerpt);
      formData.append('isPublished', values.isPublished || false);
      formData.append('isFeatured', values.isFeatured || false);
      formData.append('content', JSON.stringify(editorData));
      
      // Tags as clean array
      const cleanTags = normalizeTags(tags);
      formData.append('tags', JSON.stringify(cleanTags));
      
      // Handle image upload
      imageFileList.forEach(file => {
        if (file.originFileObj) {
          formData.append('featuredImage', file.originFileObj);
        }
      });

      if (id === 'new') {
        await api.post('/blog', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Blog created successfully');
      } else {
        await api.put(`/blog/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Blog updated successfully');
      }
      
      navigate('/admin/blog');
    } catch (error) {
      message.error('Failed to save blog');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Normalize tags to prevent nested arrays
  const normalizeTags = (tagData) => {
    if (!tagData) return [];
    
    const flatten = (arr) => {
      return arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
          return acc.concat(flatten(val));
        }
        return acc.concat(val);
      }, []);
    };
    
    let result = [];
    
    if (Array.isArray(tagData)) {
      result = flatten(tagData);
    } else if (typeof tagData === 'string') {
      try {
        const parsed = JSON.parse(tagData);
        result = Array.isArray(parsed) ? flatten(parsed) : [parsed];
      } catch {
        result = tagData.split(',').map(t => t.trim()).filter(t => t);
      }
    } else {
      result = [tagData];
    }
    
    // Clean and deduplicate
    return [...new Set(
      result
        .map(tag => String(tag).replace(/["\'\[\]]/g, '').trim())
        .filter(tag => tag && tag.length > 0)
    )];
  };

  const addTag = (newTag) => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags(prev => [...prev, trimmedTag]);
      setInputTag('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const categories = [
    'Technology', 'Business', 'Marketing', 'Design', 'Development', 'SEO', 'Tips', 'News', 'Other'
  ];

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/admin/blog')}
          style={{ marginBottom: '16px' }}
        >
          Back to Blog
        </Button>
        <Title level={2}>{id === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}</Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: '1200px' }}
      >
        <Row gutter={24}>
          <Col span={16}>
            <Card title="Content" style={{ marginBottom: '24px' }}>
              <Form.Item
                name="title"
                label="Blog Title"
                rules={[{ required: true, message: 'Please enter blog title' }]}
              >
                <Input placeholder="Enter blog title" size="large" />
              </Form.Item>

              <Form.Item
                name="slug"
                label="URL Slug"
                rules={[{ required: true, message: 'Please enter URL slug' }]}
              >
                <Input placeholder="url-friendly-slug" />
              </Form.Item>

              <Form.Item label="Content">
                <div 
                  id="editorjs" 
                  style={{ 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '6px', 
                    minHeight: '400px',
                    padding: '16px'
                  }}
                />
              </Form.Item>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Settings" style={{ marginBottom: '24px' }}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  {categories.map(cat => (
                    <Select.Option key={cat} value={cat}>{cat}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Tags">
                <div style={{ marginBottom: '8px' }}>
                  {tags.map((tag, index) => (
                    <Tag 
                      key={index} 
                      closable 
                      onClose={() => removeTag(index)}
                      style={{ 
                        marginBottom: '8px', 
                        marginRight: '8px',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        background: '#f0f9ff',
                        border: '1px solid #0ea5e9',
                        color: '#0369a1'
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
                <Input
                  placeholder="Type tag and press Enter"
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                  onPressEnter={() => addTag(inputTag)}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #d1d5db'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  Press Enter to add • Click × to remove
                </div>
              </Form.Item>

              <Form.Item name="isPublished" valuePropName="checked">
                <Switch checkedChildren="Published" unCheckedChildren="Draft" />
              </Form.Item>

              <Form.Item name="isFeatured" valuePropName="checked">
                <Switch checkedChildren="Featured" unCheckedChildren="Regular" />
              </Form.Item>
            </Card>

            <Card title="Featured Image" style={{ marginBottom: '24px' }}>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  fileList={imageFileList}
                  onChange={({ fileList }) => setImageFileList(fileList)}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  {imageFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Card>

            <Card title="Excerpt">
              <Form.Item name="excerpt">
                <TextArea 
                  rows={4} 
                  placeholder="Brief description of the blog post"
                  maxLength={200}
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Space>
            <Button onClick={() => navigate('/admin/blog')}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SaveOutlined />}
              size="large"
            >
              {id === 'new' ? 'Create Blog Post' : 'Update Blog Post'}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default BlogEdit;