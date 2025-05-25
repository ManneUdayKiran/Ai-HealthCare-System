
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const DisclaimerBanner: React.FC = () => {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <AlertTriangle className="h-4 w-4 mr-2 text-blue-600" />
      <AlertTitle className="text-blue-800">Medical Disclaimer</AlertTitle>
      <AlertDescription className="text-blue-800">
        This tool is for educational purposes only and should not replace professional medical advice. 
        If you have health concerns, please consult with a qualified healthcare provider.
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerBanner;
