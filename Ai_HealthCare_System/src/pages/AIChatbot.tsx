import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bot, MessageSquare, User, ShieldAlert, AlertTriangle, Hospital } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { AIMessage, UserMessage } from '@/components/ChatMessages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LocationInput from '@/components/LocationInput';
import SymptomDescription from '@/components/SymptomDescription';
import DoctorRecommendations from '@/components/DoctorRecommendations';
import { Doctor, getDoctorRecommendations } from '@/hooks/lib/utils/doctorRecommendations';
import { getApiKey, setApiKey, hasApiKey } from '@/hooks/lib/utils/apiKeyManager';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your medical assistant. I can provide general health information, but I'm not a replacement for professional medical advice. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // New state for the symptom and location feature
  const [symptoms, setSymptoms] = useState('');
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  
  // Initialize API key - use this directly but don't push to GitHub
  useEffect(() => {
    if (!hasApiKey()) {
      // Set the API key directly
      setApiKey('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');
    }
  }, []);

  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!hasApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please provide an OpenAI API key to use the chatbot.",
        variant: "destructive"
      });
      setShowApiKeyInput(true);
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    // Add placeholder for AI response
    const placeholderId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: placeholderId,
      content: "Thinking...",
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Use ChatGPT API
    try {
      const apiKey = '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';
      console.log("Using API key:", apiKey.substring(0, 8) + "..." + apiKey.substring(apiKey.length - 4)); // Log partial key for debugging
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gemma2-9b-it",
          messages: [
            {
              role: "system",
              content: "You are a helpful medical AI assistant. Provide general health information but always remind users to consult healthcare professionals for medical advice, diagnosis, or treatment. Be informative but cautious when discussing medical topics."
            },
            { role: "user", content: input }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Error calling OpenAI API");
      }
      
      const responseData = await response.json();
      const aiResponse = responseData.choices[0].message.content;
      
      // Replace loading message with actual response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === placeholderId 
            ? { ...msg, content: aiResponse, isLoading: false } 
            : msg
        )
      );
      
      toast({
        title: "Response received",
        description: "ChatGPT has responded to your question",
      });
      
    } catch (error: any) {
      console.error("API Error:", error);
      // Replace loading message with error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === placeholderId 
            ? { 
                ...msg, 
                content: `Error: ${error.message || "Failed to get response from ChatGPT"}. Please try again.`, 
                isLoading: false 
              } 
            : msg
        )
      );
      
      toast({
        title: "Error",
        description: error.message || "Failed to get response from ChatGPT",
        variant: "destructive"
      });
    }
    
    setIsProcessing(false);
  };

  // Function to handle finding doctors
  const handleFindDoctors = async () => {
    if (!symptoms.trim() || !location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both symptoms and location",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingDoctors(true);
    
    try {
      // Get doctor recommendations based on symptoms and location
      const recommendedDoctors = await getDoctorRecommendations(symptoms, location);
      setDoctors(recommendedDoctors);
      
      // Add a message to the chat about the recommendations
      const doctorMessage: Message = {
        id: Date.now().toString(),
        content: `Based on your symptoms (${symptoms}), I've found ${recommendedDoctors.length} healthcare providers in the ${location} area that may be able to help you. Please see the recommendations below.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, doctorMessage]);
      
      toast({
        title: "Recommendations Found",
        description: `Found ${recommendedDoctors.length} healthcare providers that may be able to help.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to find doctor recommendations",
        variant: "destructive"
      });
    }
    
    setIsLoadingDoctors(false);
  };

  return (
    <div className="container my-14 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bot className="h-8 w-8" />
        Medical Assistant AI
      </h1>

      {showApiKeyInput && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter OpenAI API Key</CardTitle>
            <CardDescription>
              Your API key is needed to use the AI chatbot. It will be stored securely in your browser.
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

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <DisclaimerBanner />
          
          <Card className="h-[calc(150vh-400px)] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle>Chat with Medical AI</CardTitle>
              <CardDescription>
                Ask health-related questions and get AI-powered responses
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                message.sender === 'user' ? (
                  <UserMessage key={message.id} content={message.content} />
                ) : (
                  <AIMessage 
                    key={message.id} 
                    content={message.isLoading ? "..." : message.content} 
                    className={message.isLoading ? "opacity-70" : ""}
                  />
                )
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <form onSubmit={handleSendMessage} className="w-full space-y-2">
                <div className="flex items-center gap-3 w-full">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your medical question here..."
                    disabled={isProcessing}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isProcessing} 
                    className="shrink-0"
                  >
                    {isProcessing ? "Processing..." : "Send"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 italic">
                  The AI provides general information only. Always consult with healthcare professionals for medical advice.
                </p>
              </form>
            </CardFooter>
          </Card>

          {/* Doctor recommendations section */}
          <DoctorRecommendations doctors={doctors} isLoading={isLoadingDoctors} />
        </div>
        
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h3 className="font-medium text-amber-800">Medical Disclaimer</h3>
                <p className="text-sm text-amber-700 mt-1">
                  This AI assistant is for informational purposes only. It does not provide medical advice, diagnosis, or treatment. 
                  Always seek the advice of physicians or qualified healthcare providers with any questions regarding medical conditions.
                </p>
              </div>
              
              {/* New find doctor section */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md space-y-4">
                <h3 className="font-medium text-blue-800 flex items-center gap-2">
                  <Hospital className="h-4 w-4" />
                  Find Doctors Near You
                </h3>
                
                <SymptomDescription symptoms={symptoms} setSymptoms={setSymptoms} />
                
                <LocationInput location={location} setLocation={setLocation} />
                
                <Button 
                  className="w-full mt-2" 
                  onClick={handleFindDoctors}
                  disabled={isLoadingDoctors || !symptoms.trim() || !location.trim()}
                >
                  {isLoadingDoctors ? "Finding Doctors..." : "Find Recommended Doctors"}
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Quick Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Be specific about your symptoms</li>
                  <li>Mention relevant medical history</li>
                  <li>Ask about general health guidelines</li>
                  <li>Inquire about prevention methods</li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Label htmlFor="example-questions">Example Questions</Label>
                <Textarea 
                  id="example-questions"
                  readOnly
                  className="mt-2 text-sm min-h-[120px]"
                  value="What are common cold symptoms?
What can help with seasonal allergies?
How much water should I drink daily?
What are signs of dehydration?"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
