
import React from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Home, Book, Heart, Settings, Bot } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { logout } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import VerificationStatus from '@/components/VerificationStatus';
import { Avatar, Button,Popover } from 'antd';
import {  Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Icon, { HomeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import type { GetProps } from 'antd';


// const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';


const NavBar: React.FC = () => {
  const { user, userData } = useAuth();
  const [users, setUsers] = useState(null); // or initial value

  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

    const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      // Navigate to login page after logout
      navigate('/login');
      // Force a page refresh to ensure all user state is cleared
      window.location.reload();
    }
  };
  const UserDetails=(
    <>
    <div className=' p-2'>
      <p>Name:{userData?.email.substring(0,4)}</p>
      <p>Email:{userData?.email}</p>
    </div>
    <div className='d-flex justify-items-center align-items-center p-2'>
     
      
      {/* <p>Name:userData?.name</p> */}
       <Button  onClick={handleLogout} className="border-blue-200 text-blue-700">
                
                Logout
              </Button>
    </div>
    </>
    

  )

  return (
    <nav className="bg-white shadow-sm w-full py-3 px-4 sm:px-6 lg:px-8 mb-6 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-teal-600">
           <Button className='md:hidden bg-slate-600 mr-3 ' type="primary"  icon={<MenuOutlined />} onClick={showDrawer}>
        
      </Button>
      <Drawer
      placement='left'
        title="Menu"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
        width={150}
      >
         <Link to="/" className="block py-2">Home</Link>
  <Link to="/home" className="block py-2">Analysis</Link>
  <Link to="/health-plan" className="block py-2">Health</Link>
  <Link to="/request-service" className="block py-2">Services</Link>
  <Link to="/ai-chatbot" className="block py-2">AI Chat</Link>
  <Link to="/resources" className="block py-2">Resources</Link>
  {/* <Link to="/accessibility" className="block py-2">Accessibility</Link> */}
      </Drawer>
            <img 
              src="/lovable-uploads/favicon/web-app-manifest-192x192.png" 
              alt="HealthCare Logo" 
              className="h-8 w-8 inline-block mr-2"/>
            HealthCare
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`hidden md:flex ${user ? 'space-x-2' : 'space-x-4'}`}>
            <Link 
              to="/" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4 inline" />
              <span className="ml-1">Home</span>
            </Link>
            <Link 
              to="/home" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/home' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>Analysis</span>
            </Link>
            <Link 
              to="/health-plan" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/health-plan' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-4 w-4 inline" />
              <span className="ml-1">Health</span>
            </Link>
            <Link 
              to="/request-service" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/request-service' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>Services</span>
            </Link>
            <Link 
              to="/ai-chatbot" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/ai-chatbot' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bot className="h-4 w-4 inline" />
              <span className="ml-1">AI Chat</span>
            </Link>
            <Link 
              to="/resources" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/resources' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Book className="h-4 w-4 inline" />
              <span className="ml-1">Resources</span>
            </Link>
            <Link 
              to="/accessibility" 
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/accessibility' 
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {/* <Settings className="h-4 w-4 inline" /> */}
              {/* <span className="ml-1">Accessibility</span> */}
            </Link>
          </div>
          
          {!user ? (
            <div className="flex items-center space-x-2">
              <Link  to="/login">
                <Button  className="border-blue-200 text-blue-700">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
           

             <div className="flex items-center space-x-2">

              <VerificationStatus />
              
             
              {/* <span className="text-sm text-gray-600 hidden sm:inline">
                {userData?.email}
              </span> */}
              {/* <Button variant="outline" size="sm" className="border-blue-200 text-blue-700">
                Logged in
              </Button> */}
               <Popover className='text-center' content={UserDetails}  title={<div style={{ textAlign: 'center' }}>User Profile</div>} trigger="click">
      <Button style={{border:'1px solid white',borderRadius:'100%',padding:'1px'}}><Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{userData?.email?.[0]?.toUpperCase() ?? ''}</Avatar></Button>
      
    </Popover>
    
             
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
