// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load initial authentication state from localStorage
  const initialUserData = JSON.parse(localStorage.getItem('userData')) || {
    isAuthenticated: false,
    accessToken: '',
    tokenExpireTime: 0,
    refreshToken: '',
    email: '',
    password: '',
  };

  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    // Save authentication state to localStorage whenever it changes
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const loginAccepted = (loginDataReceived) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      isAuthenticated: true,
      accessToken: loginDataReceived.data.access_token,
      tokenExpireTime: loginDataReceived.data.token_expire_time,
      refreshToken: loginDataReceived.data.refresh_token,
    }));
  };

  const setEmail2 = (email) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      email: email,
    }));
    console.log('Email set to:', email);
  };

  const setPassword2 = (password) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      password: password,
    }));
    console.log('HVA ER PASSWORD??:', password);
  };

  const refreshAccessToken = async () => {
    // ... your existing refreshAccessToken logic
  };

  const logout = () => {
    setUserData({
      isAuthenticated: false,
      accessToken: '',
      tokenExpireTime: 0,
      refreshToken: '',
      email: '',
      password: '',
    });
  };

  return (
    <AuthContext.Provider
      value={{ userData, loginAccepted, setEmail2, setPassword2, refreshAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
