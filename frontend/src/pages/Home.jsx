import { useState, useEffect } from 'react';
import api from '../utils/api';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  const [services, setServices] = useState([
    { _id: '1', name: 'Web Development', description: 'Custom websites and web applications', slug: 'web-development' },
    { _id: '2', name: 'Digital Marketing', description: 'SEO, PPC, and social media marketing', slug: 'digital-marketing' },
    { _id: '3', name: 'Brand Design', description: 'Logo design and brand identity', slug: 'brand-design' },
    { _id: '4', name: 'E-commerce', description: 'Online store development', slug: 'ecommerce' },
    { _id: '5', name: 'Mobile Apps', description: 'iOS and Android app development', slug: 'mobile-apps' },
    { _id: '6', name: 'Consulting', description: 'Business and technology consulting', slug: 'consulting' }
  ]);
  const [portfolio, setPortfolio] = useState([
    { _id: '1', title: 'E-commerce Platform', description: 'Modern online store', category: 'Web Development', slug: 'ecommerce-platform' },
    { _id: '2', title: 'Brand Identity', description: 'Complete brand redesign', category: 'Design', slug: 'brand-identity' },
    { _id: '3', title: 'Mobile App', description: 'iOS and Android app', category: 'Mobile', slug: 'mobile-app' },
    { _id: '4', title: 'Marketing Campaign', description: 'Digital marketing success', category: 'Marketing', slug: 'marketing-campaign' },
    { _id: '5', title: 'Website Redesign', description: 'Modern website makeover', category: 'Web Development', slug: 'website-redesign' },
    { _id: '6', title: 'SEO Optimization', description: 'Search engine optimization', category: 'SEO', slug: 'seo-optimization' }
  ]);
  const [testimonials, setTestimonials] = useState([
    { _id: '1', name: 'John Smith', company: 'Tech Corp', content: 'Excellent service and professional team!', rating: 5 },
    { _id: '2', name: 'Sarah Johnson', company: 'StartupXYZ', content: 'They transformed our digital presence completely.', rating: 5 },
    { _id: '3', name: 'Mike Davis', company: 'Local Business', content: 'Outstanding results and great communication.', rating: 5 }
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, portfolioRes, testimonialsRes] = await Promise.all([
        api.get('/services'),
        api.get('/portfolio?limit=6'),
        api.get('/testimonials')
      ]);
      
      if (servicesRes.data?.length) setServices(servicesRes.data.slice(0, 6));
      if (portfolioRes.data?.length) setPortfolio(portfolioRes.data.slice(0, 6));
      if (testimonialsRes.data?.length) setTestimonials(testimonialsRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <HeroSection />
      <StatsSection />
      <ServicesSection services={services} />
      <PortfolioSection portfolio={portfolio} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </div>
  );
};

export default Home;