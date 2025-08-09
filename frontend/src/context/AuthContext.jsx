import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const customerToken = localStorage.getItem('customerToken');
    
    // Prioritize customer token if both exist to avoid conflicts
    if (customerToken) {
      verifyCustomerToken();
    } else if (token) {
      verifyAdminToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyAdminToken = async () => {
    try {
      const response = await api.get('/auth/verify');
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const verifyCustomerToken = async () => {
    try {
      const response = await api.get('/customer/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('customerToken')}` }
      });
      setCustomer(response.data);
    } catch (error) {
      localStorage.removeItem('customerToken');
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const customerLogin = async (email, password) => {
    try {
      const response = await api.post('/customer/login', { email, password });
      const { token, customer } = response.data;
      
      localStorage.setItem('customerToken', token);
      setCustomer(customer);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const setCustomerFromPayment = (token, customerData) => {
    // Clear any existing admin token to prevent conflicts
    localStorage.removeItem('token');
    localStorage.setItem('customerToken', token);
    setUser(null);
    setCustomer(customerData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerToken');
    setUser(null);
    setCustomer(null);
  };

  const value = {
    user,
    customer,
    adminLogin,
    customerLogin,
    setCustomerFromPayment,
    logout,
    loading,
    isAdminAuthenticated: !!user,
    isCustomerAuthenticated: !!customer
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};