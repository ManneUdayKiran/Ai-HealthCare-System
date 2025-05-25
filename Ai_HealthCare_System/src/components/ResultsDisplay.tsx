
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DetectionResult } from '@/types';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ResultsDisplayProps {
  result: DetectionResult | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading }) => {
  const [showNextSteps, setShowNextSteps] = useState(false);
  
  // Show dialog when a positive result is detected
  useEffect(() => {
    if (result && (result.prediction === 'Malignant' || result.prediction === 'Eczema')) {
      setShowNextSteps(true);
    }
  }, [result]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-6">
        <CardHeader>
          <CardTitle className="text-center">Analyzing Image</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-full">
            <Progress value={undefined} className="w-full h-2" />
          </div>
          <p className="text-sm text-muted-foreground">
            Our AI model is analyzing the image. Please wait...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  const confidencePercent = (result.confidence * 100).toFixed(2);
  
  // Determine colors based on prediction type
  const isMalignant = result.prediction === 'Malignant';
  const isEczema = result.prediction === 'Eczema';
  
  // Set colors based on condition type
  let resultColor;
  let progressColor;
  
  if (isMalignant || isEczema) {
    resultColor = 'text-red-600';
    progressColor = 'bg-red-600'; 
  } else {
    resultColor = 'text-green-600';
    progressColor = 'bg-green-600';
  }

  const getNextStepsContent = () => {
    if (isMalignant) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-700 font-medium">This is not a diagnosis, but our AI has detected potential signs of skin cancer.</p>
          </div>
          
          <h3 className="font-semibold text-lg mt-4">Recommended Next Steps:</h3>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Contact a dermatologist as soon as possible for a professional examination</li>
            <li className="list-disc">Bring the image and analysis results to your appointment</li>
            <li className="list-disc">Don't delay seeking medical attention - early detection is critical</li>
            <li className="list-disc">Avoid sun exposure to the affected area until examined by a doctor</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded-lg mt-2">
            <p className="text-blue-800 text-sm">
              <strong>Remember:</strong> Only a healthcare professional can provide a proper diagnosis. This AI tool is designed to assist, not replace professional medical advice.
            </p>
          </div>
        </div>
      );
    } else if (isEczema) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-700 font-medium">This is not a diagnosis, but our AI has detected potential signs of eczema.</p>
          </div>
          
          <h3 className="font-semibold text-lg mt-4">Recommended Next Steps:</h3>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Consult with a dermatologist for a proper diagnosis and treatment plan</li>
            <li className="list-disc">Avoid scratching the affected area to prevent infection</li>
            <li className="list-disc">Keep the skin moisturized with fragrance-free lotion</li>
            <li className="list-disc">Avoid harsh soaps, detergents, and known skin irritants</li>
            <li className="list-disc">Consider using a humidifier if dry air triggers your symptoms</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded-lg mt-2">
            <p className="text-blue-800 text-sm">
              <strong>Remember:</strong> Only a healthcare professional can provide a proper diagnosis and treatment. This AI tool is designed to assist, not replace professional medical advice.
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto mt-6">
        <CardHeader>
          <CardTitle className="text-center">Detection Result</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="text-3xl font-bold text-center">
            <span className={resultColor}>{result.prediction}</span>
          </div>
          
          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Confidence Level</span>
              <span className="font-medium">{confidencePercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${progressColor}`}
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            <p>
              Analyzed on{' '}
              {result.timestamp.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showNextSteps} onOpenChange={setShowNextSteps}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Recommended Next Steps
            </DialogTitle>
          </DialogHeader>
          
          {getNextStepsContent()}
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => setShowNextSteps(false)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultsDisplay;
