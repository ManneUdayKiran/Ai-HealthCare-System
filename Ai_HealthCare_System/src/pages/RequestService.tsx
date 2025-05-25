
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { createServiceRequest } from '@/services/requestService';
import { useNavigate } from 'react-router-dom';
import DoctorResponseBox from '@/components/DoctorResponseBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const RequestService: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !userData) {
      toast({
        title: "Error",
        description: "You must be logged in to request a service.",
        variant: "destructive"
      });
      return;
    }
    
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please provide a description of your condition.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createServiceRequest({
        userId: user.id,
        userEmail: userData.email,
        description: description.trim(),
        status: 'pending',
        createdAt: Date.now()
      });
      
      toast({
        title: "Request Submitted",
        description: "Your service request has been submitted and will be reviewed by a medical professional.",
      });
      
      // Mark as submitted to show the doctor response waiting box
      setIsSubmitted(true);
      
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white my-14">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Request Medical Consultation</h1>
          <p className="mt-2 text-lg text-gray-600">
            Get personalized advice from qualified healthcare professionals
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 border border-blue-100 rounded-lg bg-blue-50">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-medium">Describe Your Condition</h3>
              <p className="text-sm text-gray-600">Provide detailed information about your symptoms</p>
            </div>
            
            <div className="text-center p-4 border border-blue-100 rounded-lg bg-blue-50">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-medium">Submit Your Request</h3>
              <p className="text-sm text-gray-600">Our system processes your consultation request</p>
            </div>
            
            <div className="text-center p-4 border border-blue-100 rounded-lg bg-blue-50">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-medium">Doctor Review</h3>
              <p className="text-sm text-gray-600">A qualified doctor will review your case and respond</p>
            </div>
          </div>
        </div>
        
        {!isSubmitted ? (
          <Card className="shadow-lg border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
              <CardTitle className="text-2xl text-gray-800">Medical Consultation Request</CardTitle>
              <CardDescription>
                Describe your condition and a medical professional will be assigned to your case. Your information is kept confidential and secure.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                <div className="grid w-full gap-4">
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Describe your symptoms or medical concerns
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Please be as specific as possible. Include: when symptoms started, severity, any treatments tried, medical history relevant to this condition..."
                      className="min-h-32 border-blue-200 focus:border-blue-400"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  disabled={isSubmitting}
                  className="border-blue-300 text-blue-700"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <>
            <Card className="shadow-lg border-blue-100 mb-4">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <CardTitle className="text-2xl text-gray-800">Request Submitted</CardTitle>
                <CardDescription>
                  Your consultation request has been submitted successfully.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    Thank you for your request. A medical professional will review your symptoms and provide a personalized response. You'll be notified when your consultation is complete.
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Your request details:</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <DoctorResponseBox />
          </>
        )}

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How Medical Consultation Works</h2>
          <div className="text-gray-600 space-y-4">
            <p>
              Our service connects you with qualified healthcare professionals who can provide guidance on your medical concerns. 
              After submitting your request, a doctor will review your symptoms and provide personalized advice.
            </p>
            <p>
              <strong>Response Time:</strong> Most consultations receive a response within 24-48 hours, depending on doctor availability and complexity of the case.
            </p>
            <p>
              <strong>Important:</strong> This service is not intended for emergencies. If you are experiencing a medical emergency, please call your local emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestService;
