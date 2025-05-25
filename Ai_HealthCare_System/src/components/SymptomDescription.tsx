
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Hospital } from 'lucide-react';

interface SymptomDescriptionProps {
  symptoms: string;
  setSymptoms: (symptoms: string) => void;
}

const SymptomDescription: React.FC<SymptomDescriptionProps> = ({ symptoms, setSymptoms }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="symptoms" className="flex items-center gap-2">
        <Hospital className="h-4 w-4" />
        Describe Your Symptoms
      </Label>
      <Textarea
        id="symptoms"
        placeholder="Describe your symptoms in detail..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="min-h-[120px]"
      />
    </div>
  );
};

export default SymptomDescription;
