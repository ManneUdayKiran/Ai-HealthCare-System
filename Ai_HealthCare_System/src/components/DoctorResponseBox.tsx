
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DoctorResponseBoxProps {
  responseText?: string;
  doctorName?: string;
  responseDate?: Date;
}

const DoctorResponseBox: React.FC<DoctorResponseBoxProps> = ({ 
  responseText,
  doctorName,
  responseDate
}) => {
  const hasResponse = !!responseText;
  
  return (
    <Card className="shadow-lg border-blue-100 mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          Doctor's Response
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-6">
        {hasResponse ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-gray-700 whitespace-pre-wrap">{responseText}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
              <div className="flex items-center gap-1">
                <span className="font-medium text-blue-700">{doctorName || 'Medical Professional'}</span>
              </div>
              {responseDate && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {responseDate.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
              <span className="text-blue-700 font-medium">Awaiting doctor's response</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              A medical professional will review your case and respond shortly. You'll be notified when a response is available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorResponseBox;
