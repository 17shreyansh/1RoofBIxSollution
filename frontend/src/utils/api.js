import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  // Check if this is a customer route
  const isCustomerRoute = config.url?.includes('/customer') || config.url?.includes('/payment');
  
  if (isCustomerRoute) {
    const customerToken = localStorage.getItem('customerToken');
    if (customerToken) {
      config.headers.Authorization = `Bearer ${customerToken}`;
    }
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isCustomerRoute = error.config?.url?.includes('/customer') || error.config?.url?.includes('/payment');
      
      if (isCustomerRoute) {
        localStorage.removeItem('customerToken');
        // Don't redirect automatically for customer routes, let the component handle it
      } else {
        localStorage.removeItem('token');
        // Only redirect to admin login for admin routes
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;