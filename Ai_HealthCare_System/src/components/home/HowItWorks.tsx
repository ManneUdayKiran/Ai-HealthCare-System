
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-8 mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How It Works</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-2xl font-bold text-teal-600">1</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-black">Create an Account</h3>
          <p className="text-gray-600">Sign up and create your profile to access our healthcare services.</p>
        </div>
        
        <div className="text-center">
          <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-2xl font-bold text-teal-600">2</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-black">Choose a Service</h3>
          <p className="text-gray-600">Select between AI image analysis or request a consultation with a medical professional.</p>
        </div>
        
        <div className="text-center">
          <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-2xl font-bold text-teal-600">3</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-black">Get Results</h3>
          <p className="text-gray-600">Receive instant AI analysis or expert medical advice from our healthcare professionals.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
