# Roof Biz Solutions - Full Stack Website

A modern, professional digital agency website built with React.js and Express.js.

## Features

- **Frontend**: React.js with Vite, responsive design, modern UI
- **Backend**: Express.js with MongoDB, RESTful API
- **Admin Panel**: Full content management system
- **Dynamic Content**: Services, portfolio, blog, testimonials
- **Lead Management**: Contact forms and inquiry tracking
- **SEO Optimized**: Meta tags, schema markup, sitemap

## Tech Stack

### Frontend
- React.js 18
- Vite
- React Router
- Axios
- Framer Motion
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (File uploads)
- Nodemailer
- Helmet (Security)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your MongoDB URI and other settings.

4. Seed the database:
```bash
node seed.js
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Default Admin Credentials

- Email: admin@roofbizsolutions.com
- Password: admin123

## Project Structure

```
roof-biz-solutions/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── uploads/         # File uploads
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Utilities
│   └── public/          # Static assets
└── README.md
```

## API Endpoints

### Public Routes
- `GET /api/services` - Get all services
- `GET /api/portfolio` - Get portfolio items
- `GET /api/blog` - Get blog posts
- `GET /api/testimonials` - Get testimonials
- `POST /api/leads` - Submit contact form

### Admin Routes (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- CRUD operations for all content types

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure production environment variables
3. Deploy to VPS or cloud platform (DigitalOcean, AWS, etc.)
4. Set up PM2 for process management
5. Configure Nginx as reverse proxy

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy to static hosting (Netlify, Vercel) or serve from backend

## Features Implemented

✅ Responsive design with mobile-first approach
✅ Modern UI with professional styling
✅ Dynamic content management
✅ SEO optimization
✅ Contact forms and lead management
✅ File upload functionality
✅ JWT authentication
✅ API rate limiting
✅ Security headers
✅ Error handling

## License

This project is licensed under the MIT License.