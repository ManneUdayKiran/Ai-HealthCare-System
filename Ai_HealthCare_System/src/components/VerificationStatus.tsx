
import React from 'react';
import { Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

const VerificationStatus: React.FC = () => {
  const { user, isPendingVerification } = useAuth();
  
  // Only show for doctor accounts
  if (!user || user.userType !== 'doctor') {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center cursor-help">
            <Info className="h-5 w-5 text-blue-500" />
            <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-800 border-yellow-300">
              Not Verified
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="w-[200px] text-sm">
            Your doctor account is pending verification. Our team is reviewing your submitted documents.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationStatus;
