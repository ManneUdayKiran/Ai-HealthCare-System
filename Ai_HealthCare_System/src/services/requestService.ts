
interface ServiceRequest {
  id?: string;
  userId: string;
  userEmail: string;
  description: string;
  status: 'pending' | 'assigned' | 'completed';
  doctorId?: string;
  doctorEmail?: string;
  createdAt: number;
  assignedAt?: number;
}

// Storage keys
const REQUESTS_STORAGE_KEY = 'service_requests';
const DOCTOR_NOTIFICATIONS_KEY = 'doctor_notifications';

// Helper to generate ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Helper to get doctors
const getDoctors = (): Record<string, any> => {
  const usersJson = localStorage.getItem('skin_lesion_app_users');
  if (!usersJson) return {};
  
  const users = JSON.parse(usersJson);
  return Object.values(users).reduce((acc: Record<string, any>, user: any) => {
    if (user.userType === 'doctor') {
      acc[user.id] = user;
    }
    return acc;
  }, {});
};

// Save requests to localStorage
const saveRequests = (requests: Record<string, ServiceRequest>): void => {
  localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
};

// Get requests from localStorage
const getRequests = (): Record<string, ServiceRequest> => {
  const requestsJson = localStorage.getItem(REQUESTS_STORAGE_KEY);
  return requestsJson ? JSON.parse(requestsJson) : {};
};

// Save notifications to localStorage
const saveNotifications = (notifications: Record<string, any[]>): void => {
  localStorage.setItem(DOCTOR_NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

// Get notifications from localStorage
const getNotifications = (): Record<string, any[]> => {
  const notificationsJson = localStorage.getItem(DOCTOR_NOTIFICATIONS_KEY);
  return notificationsJson ? JSON.parse(notificationsJson) : {};
};

// Create a new service request
export const createServiceRequest = async (requestData: Omit<ServiceRequest, 'id'>): Promise<ServiceRequest> => {
  const requests = getRequests();
  const requestId = generateId();
  
  // Create the new request
  const newRequest: ServiceRequest = {
    ...requestData,
    id: requestId,
  };
  
  // Save the request
  requests[requestId] = newRequest;
  saveRequests(requests);
  
  // Assign to a random doctor
  const doctors = getDoctors();
  const doctorIds = Object.keys(doctors);
  
  if (doctorIds.length > 0) {
    // Select a random doctor
    const randomIndex = Math.floor(Math.random() * doctorIds.length);
    const selectedDoctorId = doctorIds[randomIndex];
    const selectedDoctor = doctors[selectedDoctorId];
    
    // Create notification for the doctor
    const notifications = getNotifications();
    if (!notifications[selectedDoctorId]) {
      notifications[selectedDoctorId] = [];
    }
    
    notifications[selectedDoctorId].push({
      id: generateId(),
      type: 'service_request',
      requestId,
      userEmail: requestData.userEmail,
      createdAt: Date.now(),
      read: false,
      message: `New service request from ${requestData.userEmail}`,
    });
    
    saveNotifications(notifications);
    
    // Update the request with the assigned doctor
    requests[requestId].doctorId = selectedDoctorId;
    requests[requestId].doctorEmail = selectedDoctor.email;
    requests[requestId].assignedAt = Date.now();
    requests[requestId].status = 'assigned';
    saveRequests(requests);
  }
  
  return newRequest;
};

// Get user's requests
export const getUserRequests = (userId: string): ServiceRequest[] => {
  const requests = getRequests();
  return Object.values(requests).filter(request => request.userId === userId);
};

// Get doctor's assigned requests
export const getDoctorRequests = (doctorId: string): ServiceRequest[] => {
  const requests = getRequests();
  return Object.values(requests).filter(request => request.doctorId === doctorId);
};

// Get doctor's notifications
export const getDoctorNotifications = (doctorId: string): any[] => {
  const notifications = getNotifications();
  return notifications[doctorId] || [];
};

// Mark notification as read
export const markNotificationAsRead = (doctorId: string, notificationId: string): void => {
  const notifications = getNotifications();
  
  if (notifications[doctorId]) {
    notifications[doctorId] = notifications[doctorId].map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    saveNotifications(notifications);
  }
};
