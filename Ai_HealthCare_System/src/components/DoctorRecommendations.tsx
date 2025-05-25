
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/hooks/lib/utils/doctorRecommendations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hospital, MapPin, User } from 'lucide-react';

interface DoctorRecommendationsProps {
  doctors: Doctor[];
  isLoading: boolean;
}

const DoctorRecommendations: React.FC<DoctorRecommendationsProps> = ({ doctors, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="mt-4 border border-blue-200">
        <CardHeader className="bg-blue-50 border-b border-blue-200">
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Hospital className="h-5 w-5" />
            Finding Doctor Recommendations
          </CardTitle>
          <CardDescription>
            Analyzing your symptoms and location...
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (doctors.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4 border border-blue-200">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <Hospital className="h-5 w-5" />
          Doctor Recommendations
        </CardTitle>
        <CardDescription>
          Based on your symptoms, here are some specialists you might want to consult
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell className="flex items-start gap-1">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <span className="text-sm">{doctor.address}<br/>{doctor.distance} away</span>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    {[...Array(doctor.rating)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                      </svg>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-blue-50 p-4 border-t border-blue-200">
        <p className="text-xs text-blue-700 italic">
          Please consult with healthcare providers for proper diagnosis. Always call ahead to verify availability and insurance acceptance.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DoctorRecommendations;
