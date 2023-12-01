// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    isAuthenticated: false,
    accessToken: '',
    tokenExpireTime: 0,
    refreshToken: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Check if the user is authenticated and has a refresh token
    if (userData.isAuthenticated && userData.refreshToken) {
      // Call the function to refresh the access token
      refreshAccessToken();
    }
  }, [userData.isAuthenticated, userData.refreshToken]);

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
    try {
      const response = await fetch('https://restapi-main-01.woit.net/refresh_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.refreshToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        setUserData((prevUserData) => ({
          ...prevUserData,
          accessToken: responseData.access_token,
          tokenExpireTime: responseData.token_expire_time,
        }));

        console.log('Access token refreshed:', responseData);
      } else {
        // Handle the case where refreshing the token fails
        console.error('Failed to refresh access token');
      }
    } catch (error) {
      console.error('Error during token refresh:', error);
    }
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
      value={{ userData, loginAccepted, setEmail2, setPassword2, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
