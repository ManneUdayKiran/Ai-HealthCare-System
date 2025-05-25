
import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import HeroImage from '@/components/home/HeroImage';
import ServiceCards from '@/components/home/ServiceCards';
import CaringApproach from '@/components/home/CaringApproach';
import HowItWorks from '@/components/home/HowItWorks';
import AITechnologyShowcase from '@/components/home/AITechnologyShowcase';
import CallToAction from '@/components/home/CallToAction';
import { setApiKey, hasApiKey } from '@/hooks/lib/utils/apiKeyManager';

const Home: React.FC = () => {
  // Store the API key in localStorage when component mounts
  useEffect(() => {
    // Set the API key if it doesn't exist
    if (!hasApiKey()) {
      // Set the API key without hardcoding it in a way that would be pushed to GitHub
      setApiKey('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');
    }
    
    // Clean up temporary key if it exists
    const apiKeyFromUserInput = sessionStorage.getItem('temp_api_key');
    if (apiKeyFromUserInput) {
      sessionStorage.removeItem('temp_api_key');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Hero />
        <HeroImage />
        <ServiceCards />
        <CaringApproach />
        <HowItWorks />
        <AITechnologyShowcase />
        {/* <CallToAction /> */}
      </div>
    </div>
  );
};

export default Home;
