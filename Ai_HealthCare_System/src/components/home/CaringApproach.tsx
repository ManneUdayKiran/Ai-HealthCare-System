
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CaringApproach: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Caring Approach</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <img 
            src="/lovable-uploads/support.jpg" 
            alt="Doctor with elderly patient" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
            <p className="text-gray-600">Every patient receives individualized attention tailored to their unique health needs.</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <img 
            src="/lovable-uploads/expert.webp" 
            alt="Medical team discussion" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Expert Collaboration</h3>
            <p className="text-gray-600">Our healthcare professionals work together to provide comprehensive treatment plans.</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <img 
            src="/lovable-uploads/HealthCare4.jpg" 
            alt="Supportive healthcare" 
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Compassionate Support</h3>
            <p className="text-gray-600">We're here for you every step of the way with empathetic and supportive care.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaringApproach;
