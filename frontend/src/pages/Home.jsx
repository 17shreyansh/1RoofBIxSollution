import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useContent } from '../context/ContentContext';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const { content: dynamicContent, loading: contentLoading } = useContent();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesRes, portfolioRes, testimonialsRes] = await Promise.all([
        api.get('/services'),
        api.get('/portfolio?limit=6'),
        api.get('/testimonials')
      ]);
      
      setServices(servicesRes.data?.slice(0, 6) || []);
      setPortfolio(portfolioRes.data?.slice(0, 6) || []);
      setTestimonials(testimonialsRes.data?.slice(0, 3) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || contentLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '140px'
      }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <HeroSection content={dynamicContent.home || {}} />
      <StatsSection content={dynamicContent.home || {}} />
      <ServicesSection services={services} content={dynamicContent.home || {}} />
      <PortfolioSection portfolio={portfolio} content={dynamicContent.home || {}} />
      <TestimonialsSection testimonials={testimonials} content={dynamicContent.home || {}} />
      <CTASection content={dynamicContent.home || {}} />
    </div>
  );
};

export default Home;