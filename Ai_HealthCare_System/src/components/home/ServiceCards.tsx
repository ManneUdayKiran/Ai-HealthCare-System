
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServiceCards: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 mb-16">
      <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
        <div className="h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Disease Analysis</h2>
        <p className="text-gray-600 mb-6">
          Our advanced AI technology analyzes medical images to detect potential health concerns with remarkable accuracy, providing quick preliminary assessments when you need them most.
        </p>
        <Link to="/home">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            Try Image Analysis
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
        <div className="h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Consultation</h2>
        <p className="text-gray-600 mb-6">
          Connect with healthcare professionals for personalized medical advice. Submit your symptoms and get matched with a qualified doctor for virtual consultation.
        </p>
        <Link to="/request-service">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            Request Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCards;
