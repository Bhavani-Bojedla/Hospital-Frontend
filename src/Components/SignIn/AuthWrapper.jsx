// src/components/AuthWrapper.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AuthWrapper.css';

const AuthWrapper = ({ children }) => {
  const location = useLocation();
  const [activeForm, setActiveForm] = useState(location.pathname === '/signin' ? 'signin' : 'signup');

  useEffect(() => {
    if (location.pathname === '/signin') {
      setActiveForm('signin');
    } else if (location.pathname === '/signup') {
      setActiveForm('signup');
    }
  }, [location]);

  return (
    <div className="flex w-screen h-screen auth-wrapper">
      <div className="relative flex w-full h-full">
        {/* Sliding Background Image Section */}
        <div className={`image-section bg-cover bg-center ${activeForm}`}></div>

        {/* Form Section (SignIn/Signup) */}
        <div className="flex items-center justify-center w-1/2 bg-gray-100 form-section">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
