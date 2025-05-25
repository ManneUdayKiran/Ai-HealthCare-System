
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { setAnalysisThresholds } from '@/services/modelService';

interface ModelUploaderProps {
  onModelLoaded: (loaded: boolean) => void;
}

const ModelUploader: React.FC<ModelUploaderProps> = ({ onModelLoaded }) => {
  const { toast } = useToast();

  // Apply default settings on component mount
  useEffect(() => {
    applySettings();
  }, []);

  const applySettings = () => {
    // Always use the fixed values: asymmetry=0, border=0, color=0.2, diameter=0.5
    setAnalysisThresholds(0, 0, 0.2, 0.5);
    toast({
      title: "Detection Settings Applied",
      description: "The skin lesion analysis parameters have been configured.",
      variant: "default"
    });
    onModelLoaded(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardHeader>
        <CardTitle className="text-center">Detection Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center text-sm text-gray-500">
          <p>
            This system uses the ABCD method for skin lesion analysis:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Asymmetry: 0%</li>
            <li>Border Irregularity: 0%</li>
            <li>Color Variance: 20%</li>
            <li>Diameter: 50%</li>
          </ul>
        </div>

        <Button 
          onClick={applySettings} 
          className="w-full"
        >
          Initialize Detection System
        </Button>

        <p className="text-sm text-gray-500 text-center">
          This system uses the ABCD analysis algorithm for skin lesion assessment
          (Asymmetry, Border, Color, Diameter).
        </p>
      </CardContent>
    </Card>
  );
};

export default ModelUploader;
