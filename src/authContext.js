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
    email_address: '',
    user_reg_ID: '',
  };

  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    // Save authentication state to localStorage whenever it changes
    localStorage.setItem('userData', JSON.stringify(userData));

    // Log updated userData whenever it changes
    console.log('Updated userData:', userData);
  }, [userData]);

  useEffect(() => {
    // Refresh token every 5 minutes
    const tokenRefreshInterval = setInterval(refreshAccessToken, 5 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(tokenRefreshInterval);
  }, [refreshAccessToken]);

  const saveLoginData = (loginDataReceived) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      isAuthenticated: true,
      accessToken: loginDataReceived.access_token,
      tokenExpireTime: loginDataReceived.token_expire_time,
      refreshToken: loginDataReceived.refresh_token,
      user: {
        ...prevUserData.user,
        user_reg_ID: loginDataReceived.user.user_reg_ID,
        email_address: loginDataReceived.user.email_address,
        first_name: loginDataReceived.user.first_name,
        last_name: loginDataReceived.user.last_name,
        phone_number: loginDataReceived.user.phone_number,
      },
    }));
  
    // Log updated userData after saving login data
    console.log('Login data saved! Updated userData:', userData);
  };


  const refreshAccessToken = async () => {
    // Implement your logic to refresh the access token
    console.log('Attempting to refresh access token...');
    console.log('userData before refresh:', userData);
  
    try {
      const response = await fetch('http://139.59.156.28:5080/user_auth/refresh_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.refreshToken}`, // Include the Authorization header
        },
        body: JSON.stringify({
          refresh_token: userData.refreshToken,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Access token refreshed successfully:', data.access_token);
        
        // Update the user data with the new tokens
        saveLoginData(data);
  
        // Log updated userData after saving login data
        console.log('userData after refresh:', userData);
      } else {
        console.error('Error refreshing access token:', response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const logout = () => {
    setUserData({
      isAuthenticated: false,
      accessToken: '',
      tokenExpireTime: 0,
      refreshToken: '',
      email_address: '',
      user_reg_ID: '',
    });
  };

  return (
    <AuthContext.Provider value={{ userData, saveLoginData, refreshAccessToken, logout }}>
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
