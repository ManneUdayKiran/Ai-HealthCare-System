
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  location: string;
  setLocation: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ location, setLocation }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="location" className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Your Location
      </Label>
      <Input
        id="location"
        placeholder="Enter your city or zip code"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
};

export default LocationInput;
