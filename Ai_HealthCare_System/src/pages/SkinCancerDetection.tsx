import React, { useState, useEffect, useRef } from 'react';
import { ImageFile, DetectionResult } from '@/types';
import ImageUpload from '@/components/ImageUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { Button } from '@/components/ui/button';
import { detectSkinCancer, detectEczema } from '@/services/modelService';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Scan, Heart, Brain, FlaskConical, BadgePlus, ActivitySquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setApiKey, hasApiKey } from '@/hooks/lib/utils/apiKeyManager';
import { Input } from '@/components/ui/input';

const SkinCancerDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("skin-cancer");
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(!hasApiKey());

  // Store the API key in localStorage when component mounts
  useEffect(() => {
    const apiKeyFromSession = sessionStorage.getItem('temp_api_key');
    if (apiKeyFromSession) {
      setApiKey(apiKeyFromSession);
      setShowApiKeyInput(false);
      // Clear from session storage after transferring
      sessionStorage.removeItem('temp_api_key');
    } else if (!hasApiKey()) {
      setShowApiKeyInput(true);
    }
  }, []);

  // Reset result when image changes or tab changes
  useEffect(() => {
    setResult(null);
  }, [selectedImage, activeTab]);

  const handleAnalyzeImage = async () => {
    if (!selectedImage || !imageRef.current) {
      toast({
        title: 'No Image Selected',
        description: 'Please upload an image to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      let detectionResult;
      if (activeTab === 'skin-cancer') {
        detectionResult = await detectSkinCancer(imageRef.current);
      } else if (activeTab === 'eczema') {
        detectionResult = await detectEczema(imageRef.current);
      } else {
        throw new Error('Invalid tab selected');
      }
      
      setResult(detectionResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: 'Analysis Error',
        description: 'Failed to analyze the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setApiKeyInput('');
      setShowApiKeyInput(false);
      toast({
        title: "API Key Set",
        description: "Your OpenAI API key has been stored securely.",
      });
    }
  };

  const ComingSoonCard = ({ title, icon: Icon, description }: { title: string, icon: React.FC<any>, description: string }) => (
    <Card className="bg-gray-50 border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-gray-400" />
          <CardTitle className="text-lg text-gray-500">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-6">
          <Button disabled className="bg-gray-300">
            <BadgePlus className="mr-2 h-4 w-4" />
            Coming Soon
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const AnalysisContent = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Upload an Image
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          For best results, upload a well-lit, close-up photo against a neutral background.
        </p>
        <ImageUpload 
          onImageSelect={setSelectedImage} 
          selectedImage={selectedImage} 
        />
        {selectedImage && (
          <div className="hidden">
            <img 
              ref={imageRef}
              src={selectedImage.preview}
              alt="Selected for analysis"
              crossOrigin="anonymous"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center mb-6">
        <Button 
          onClick={handleAnalyzeImage} 
          disabled={!selectedImage || isLoading}
          className="px-6 py-2"
          size="lg"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Image'}
        </Button>
      </div>

      <ResultsDisplay result={result} isLoading={isLoading} />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 my-14">
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Health Analysis Tools
        </h1>
        
        {showApiKeyInput && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Enter OpenAI API Key</CardTitle>
              <CardDescription>
                Your API key is needed for analysis. It will be stored securely in your browser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                  className="flex-1"
                />
                <Button onClick={handleSetApiKey}>Save Key</Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your API key is stored locally on your device and never sent to our servers.
              </p>
            </CardContent>
          </Card>
        )}
        
        <Tabs defaultValue="skin-cancer" className="w-full mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full mb-6">
            <TabsTrigger value="skin-cancer" className="flex items-center gap-2">
              <Scan className="h-4 w-4" />
              <span>Skin Cancer</span>
            </TabsTrigger>
            <TabsTrigger value="eczema" className="flex items-center gap-2">
              <ActivitySquare className="h-4 w-4" />
              <span>Eczema</span>
            </TabsTrigger>
            <TabsTrigger value="heart-health" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Heart Health</span>
            </TabsTrigger>
            <TabsTrigger value="brain-scan" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Brain Scan</span>
            </TabsTrigger>
            <TabsTrigger value="lab-results" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              <span>Lab Results</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skin-cancer">
            <DisclaimerBanner />

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <AnalysisContent />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                About This Tool
              </h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  This application uses advanced AI to analyze skin lesions for potential signs of skin cancer,
                  evaluating factors such as asymmetry, border irregularity, color variation, and diameter.
                </p>
                <p>
                  <strong>Important:</strong> This tool is not a substitute for professional medical 
                  diagnosis. If you have concerns about a skin lesion, please consult a dermatologist 
                  immediately.
                </p>
                <p>
                  Early detection of skin cancer significantly improves treatment outcomes. 
                  Regular skin self-examinations and professional check-ups are recommended.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="eczema">
            <DisclaimerBanner />

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <AnalysisContent />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                About This Tool
              </h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  This application uses advanced AI to analyze skin conditions for signs of eczema,
                  including redness, dryness, inflammation, and other characteristic patterns.
                </p>
                <p>
                  <strong>Important:</strong> This tool is not a substitute for professional medical 
                  diagnosis. If you have concerns about your skin condition, please consult a dermatologist 
                  immediately.
                </p>
                <p>
                  Early management of eczema can significantly improve comfort and prevent flare-ups.
                  A proper skin care routine and avoiding triggers are essential parts of eczema management.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="heart-health">
            <ComingSoonCard 
              title="Heart Health Analysis"
              icon={Heart}
              description="Upload ECG readings and heart-related data for AI analysis of potential cardiovascular issues."
            />
          </TabsContent>
          
          <TabsContent value="brain-scan">
            <ComingSoonCard 
              title="Brain Scan Analysis"
              icon={Brain}
              description="Upload brain scan images for AI-assisted analysis of neurological conditions."
            />
          </TabsContent>
          
          <TabsContent value="lab-results">
            <ComingSoonCard 
              title="Lab Results Interpreter"
              icon={FlaskConical}
              description="Upload your lab test results for AI interpretation and explanation in simple terms."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkinCancerDetection;
