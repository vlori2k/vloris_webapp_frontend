// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    isAuthenticated: false,
    email: '',
    password: '',
    accessToken: '',
    tokenExpireTime: 0,
    refreshToken: '',
    userRoleID: 0,
  });

  const loginAccepted = (data) => {
    console.log("hey hey i came in here");
    console.log("how does the data look ?" + data);

    
  const loginAccepted2 = (data) => {
    setUserData({
      isAuthenticated: true,
      email: data.email,
      password: data.password,
      accessToken: data.accessToken,
      tokenExpireTime: data.tokenExpireTime,
      refreshToken: data.refreshToken,
      userRoleID: data.userRoleID,
    });
  };

  const logout = () => {
    setUserData({
      isAuthenticated: false,
      email: '',
      password: '',
      accessToken: '',
      tokenExpireTime: 0,
      refreshToken: '',
      userRoleID: 0,
    });
  };

  return (
    <AuthContext.Provider value={{ userData, loginAccepted, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
