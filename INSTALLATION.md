# Installation Guide - Roof Biz Solutions CMS

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

## Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install additional dependencies:**
```bash
npm install slugify express-validator cloudinary multer-storage-cloudinary
```

4. **Configure environment variables:**
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/roof-biz-solutions
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
PORT=5000

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

5. **Seed the database with sample data:**
```bash
node seed-enhanced.js
```

6. **Start the backend server:**
```bash
npm run dev
```

## Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install additional dependencies:**
```bash
npm install antd react-quill recharts dayjs
```

4. **Configure environment variables:**
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start the development server:**
```bash
npm run dev
```

## Access the Application

### Public Website
- URL: http://localhost:5173
- Browse the public website with dynamic content

### Admin Panel
- URL: http://localhost:5173/admin/login
- Email: admin@roofbizsolutions.com
- Password: admin123

## Admin Panel Features

### Dashboard
- Overview statistics
- Recent leads
- Top services by inquiries
- Charts and analytics

### Content Management
- Edit all website content
- WYSIWYG editor for rich text
- SEO settings for each page/section
- Image uploads

### Service Management
- CRUD operations for services
- Pricing tiers
- Feature management
- Image uploads
- Active/inactive toggle

### Portfolio Management
- Project showcase management
- Client information
- Results and metrics
- Image galleries
- Category filtering

### Blog Management
- Full blog CMS
- Rich text editor
- SEO optimization
- Publish/unpublish
- Author management

### Lead Management
- View all inquiries
- Status tracking
- Priority levels
- Notes system
- Export to CSV
- Detailed lead profiles

### Pricing Plans
- Manage service packages
- Multiple pricing tiers
- Feature lists
- Popular plan highlighting

### Partners & Certifications
- Logo management
- Partner types
- Website links
- Display order

## File Upload Configuration

The system supports both local file storage and Cloudinary integration:

### Local Storage (Default)
Files are stored in `backend/uploads/` directory and served at `/uploads/` endpoint.

### Cloudinary (Recommended for Production)
Configure Cloudinary credentials in `.env` file for cloud-based image storage and optimization.

## Database Structure

The system uses MongoDB with the following collections:
- `users` - Admin users and roles
- `services` - Service offerings
- `portfolio` - Project showcase
- `blogs` - Blog posts
- `products` - Digital products
- `leads` - Customer inquiries
- `testimonials` - Customer reviews
- `pricingplans` - Service packages
- `partners` - Partners and certifications
- `content` - Dynamic page content

## Security Features

- JWT-based authentication
- Role-based access control
- Input validation
- Rate limiting
- CORS protection
- Helmet security headers
- Password hashing with bcrypt

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment variables
2. Configure production MongoDB URI
3. Set up PM2 for process management
4. Configure Nginx as reverse proxy
5. Enable SSL/HTTPS

### Frontend
1. Build the production version:
```bash
npm run build
```
2. Deploy to static hosting (Netlify, Vercel) or serve from backend
3. Update API URL in environment variables

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **CORS Errors**
   - Verify frontend URL in backend CORS configuration
   - Check API base URL in frontend

3. **File Upload Issues**
   - Ensure `uploads` directory exists and has write permissions
   - Check Cloudinary configuration if using cloud storage

4. **Authentication Issues**
   - Verify JWT secret is set
   - Check token expiration settings

### Support
For technical support or questions, please refer to the documentation or contact the development team.