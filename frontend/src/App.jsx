import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ContentManager from './components/admin/ContentManager';
import ServiceManager from './components/admin/ServiceManager';
import ServiceEdit from './components/admin/ServiceEdit';
import PortfolioEdit from './components/admin/PortfolioEdit';
import BlogEdit from './components/admin/BlogEdit';
import PortfolioManager from './components/admin/PortfolioManager';
import BlogManager from './components/admin/BlogManager';
import LeadManager from './components/admin/LeadManager';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
          <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
          <Route path="/portfolio/:slug" element={<Layout><PortfolioDetail /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogDetail /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="services/:id" element={<ServiceEdit />} />
            <Route path="portfolio/:id" element={<PortfolioEdit />} />
            <Route path="blog/:id" element={<BlogEdit />} />
            <Route path="portfolio" element={<PortfolioManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="leads" element={<LeadManager />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;