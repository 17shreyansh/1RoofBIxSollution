const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content');
    
    const total = await Blog.countDocuments(filter);
    res.json({ blogs, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes (must come before /:slug)
router.get('/admin', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get blog by ID for admin editing
router.get('/admin/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, upload.single('featuredImage'), async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (req.file) blogData.featuredImage = `/uploads/${req.file.filename}`;
    
    // Normalize tags
    if (blogData.tags) {
      blogData.tags = Blog.normalizeTags(blogData.tags);
    }
    
    const blog = new Blog(blogData);
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error('Blog creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, upload.single('featuredImage'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.featuredImage = `/uploads/${req.file.filename}`;
    
    // Normalize tags
    if (updateData.tags) {
      updateData.tags = Blog.normalizeTags(updateData.tags);
    }
    
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('Blog update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Test endpoint for image upload
router.post('/test-upload', auth, (req, res) => {
  console.log('Test upload endpoint hit');
  console.log('Headers:', req.headers);
  res.json({ message: 'Test endpoint working', auth: !!req.user });
});

// Image upload for EditorJS
router.post('/upload-image', auth, (req, res) => {
  console.log('Image upload request received');
  console.log('Headers:', req.headers);
  console.log('User:', req.user);
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: 0, error: err.message });
    }
    
    console.log('File:', req.file);
    console.log('Body:', req.body);
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ success: 0, error: 'No image uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log('Image uploaded successfully:', imageUrl);
    
    res.json({
      success: 1,
      file: {
        url: imageUrl
      }
    });
  });
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;