const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');
const Product = require('../models/Product');
const Lead = require('../models/Lead');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const [
      totalServices,
      totalProjects,
      totalProducts,
      totalLeads,
      newLeadsThisMonth,
      totalBlogs,
      publishedBlogs
    ] = await Promise.all([
      Service.countDocuments({ isActive: true }),
      Portfolio.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true }),
      Lead.countDocuments(),
      Lead.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }),
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true })
    ]);

    // Get top services by leads
    const topServices = await Lead.aggregate([
      { $match: { service: { $exists: true, $ne: null } } },
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get recent leads
    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email service type status createdAt');

    // Get leads by status
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      stats: {
        totalServices,
        totalProjects,
        totalProducts,
        totalLeads,
        newLeadsThisMonth,
        totalBlogs,
        publishedBlogs
      },
      topServices,
      recentLeads,
      leadsByStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;