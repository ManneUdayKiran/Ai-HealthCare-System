
interface User {
  id: string;
  email: string;
  userType: 'user' | 'doctor';
  createdAt: number;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
}

interface VerificationFile {
  name: string;
  size: number;
  type: string;
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

// Mock users storage
const USERS_STORAGE_KEY = 'skin_lesion_app_users';
const CURRENT_USER_KEY = 'skin_lesion_app_current_user';
const VERIFICATION_FILES_KEY = 'doctor_verification_files';

// Helper to get users from localStorage
const getUsers = (): Record<string, User> => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : {};
};

// Helper to save users to localStorage
const saveUsers = (users: Record<string, User>): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Helper to get verification files
const getVerificationFiles = (): Record<string, VerificationFile[]> => {
  const filesJson = localStorage.getItem(VERIFICATION_FILES_KEY);
  return filesJson ? JSON.parse(filesJson) : {};
};

// Helper to save verification files
const saveVerificationFiles = (files: Record<string, VerificationFile[]>): void => {
  localStorage.setItem(VERIFICATION_FILES_KEY, JSON.stringify(files));
};

// Generate a simple ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const login = async (email: string, password: string): Promise<AuthResult> => {
  try {
    // For demo purposes, using a simple email-based lookup
    // In a real app, you would hash passwords and compare them securely
    const users = getUsers();
    const user = Object.values(users).find(u => u.email === email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    // This is just for demonstration - in a real app, NEVER store passwords in localStorage
    // and NEVER store them unhashed
    const passwordsMap = JSON.parse(localStorage.getItem('user_passwords') || '{}');
    if (passwordsMap[user.id] !== password) {
      return { success: false, error: 'Invalid password' };
    }
    
    // Save current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    return { success: true, user };
  } catch (error: any) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message || 'An error occurred during login' };
  }
};

export const register = async (
  email: string, 
  password: string, 
  userType: 'user' | 'doctor',
  verificationFiles: VerificationFile[] = []
): Promise<AuthResult> => {
  try {
    const users = getUsers();
    
    // Check if email already exists
    if (Object.values(users).some(user => user.email === email)) {
      return { success: false, error: 'Email already in use' };
    }
    
    // Create new user
    const userId = generateId();
    const newUser: User = {
      id: userId,
      email,
      userType,
      createdAt: Date.now()
    };
    
    // Add verification status for doctors
    if (userType === 'doctor') {
      newUser.verificationStatus = 'pending';
      
      // Store verification files
      const verificationFilesMap = getVerificationFiles();
      verificationFilesMap[userId] = verificationFiles;
      saveVerificationFiles(verificationFilesMap);
    }
    
    // Store user
    users[userId] = newUser;
    saveUsers(users);
    
    // Store password separately (again, this is just for demo purposes)
    const passwords = JSON.parse(localStorage.getItem('user_passwords') || '{}');
    passwords[userId] = password;
    localStorage.setItem('user_passwords', JSON.stringify(passwords));
    
    // Set as current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  } catch (error: any) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message || 'An error occurred during registration' };
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Get verification files for a specific user
export const getUserVerificationFiles = (userId: string): VerificationFile[] => {
  const files = getVerificationFiles();
  return files[userId] || [];
};

