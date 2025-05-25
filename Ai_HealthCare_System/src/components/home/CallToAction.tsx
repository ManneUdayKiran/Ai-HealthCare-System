
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to take control of your health?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Join thousands of users who have already benefited from our quick, convenient and reliable healthcare services.
      </p>
      <div className="flex justify-center space-x-4">
        <Link to="/home">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">
            Try Image Analysis
          </Button>
        </Link>
        <Link to="/request-service">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">
            Request Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
