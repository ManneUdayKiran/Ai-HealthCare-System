
import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/services/auth';

interface User {
  id: string;
  email: string;
  userType: 'user' | 'doctor';
  createdAt: number;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User |null >(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data
  const refreshUser = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  };

  useEffect(() => {
    // Get user from localStorage on initial load
    refreshUser();
    
    // Setup event listener for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      refreshUser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen to custom auth events
    window.addEventListener('auth-state-changed', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-state-changed', handleStorageChange);
    };
  }, []);

  return { 
    user: currentUser, 
    userData: currentUser, // Keep API compatibility with previous Firebase version
    loading,
    isDoctor: currentUser?.userType === 'doctor',
    isPendingVerification: currentUser?.userType === 'doctor' && currentUser?.verificationStatus === 'pending',
    isVerified: currentUser?.userType === 'doctor' && currentUser?.verificationStatus === 'approved',
    refreshUser
  };
};
