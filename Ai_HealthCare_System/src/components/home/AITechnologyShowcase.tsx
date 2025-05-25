
import React from 'react';
import { Brain, Database, Shield } from "lucide-react";

const AITechnologyShowcase: React.FC = () => {
  return (
    <div className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg">
      <div className="grid md:grid-cols-2">
        <div className="p-8 flex items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Advanced AI Technology</h3>
            <p className="text-blue-100 mb-6">
              Our state-of-the-art artificial intelligence systems provide medical analysis with up to 95% accuracy, rivaling expert dermatologists in detecting skin conditions and other health concerns.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                <Brain className="h-5 w-5 text-white mr-2" />
                <span className="text-white text-sm font-medium">Advanced Neural Networks</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                <Shield className="h-5 w-5 text-white mr-2" />
                <span className="text-white text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                <Database className="h-5 w-5 text-white mr-2" />
                <span className="text-white text-sm font-medium">Trained on 10M+ Images</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="AI Technology Visualization" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AITechnologyShowcase;
