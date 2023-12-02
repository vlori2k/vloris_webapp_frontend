// Dashboard.js
import React, { useEffect } from 'react';
import { useAuthContext } from '../../authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not authenticated, redirect to login page
    if (!userData.isAuthenticated) {
      // Delay the redirection to ensure userData is updated
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 0);

      return () => clearTimeout(redirectTimeout);
    }
  }, [userData.isAuthenticated, userData.email, userData.password, userData.accessToken, userData.refreshToken, navigate]);

  console.log("HEEY BABYY0");
  console.log(userData.isAuthenticated);
  return (
    <div className="dashboard-container">
      {userData.isAuthenticated ? (
        <div>
          <h1>Welcome to the Main Page!</h1>
          <p>Email: {userData.email}</p>
          <p>Password: {userData.password}</p>
          <p>Access Token: {userData.accessToken}</p>
          <p>Refresh Token: {userData.refreshToken}</p>

          <p>Am i Authenticated?: {userData.isAuthenticated}</p>
          {/* Add more user data as needed */}
        </div>
      ) : (
        // You can customize this message or add a redirect to login here as well
        <p>You are not authenticated. Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
