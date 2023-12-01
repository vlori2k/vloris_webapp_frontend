// Dashboard.js

import React from 'react';
import { useAuthContext } from '../../authContext';

const Dashboard = () => {
  const { userData } = useAuthContext();

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Main Page!</h1>
      {userData.isAuthenticated ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Access Token: {userData.accessToken}</p>
          {/* Add more user data as needed */}
        </div>
      ) : (
        <p>This is a funny message or any content you want to display.</p>
      )}
    </div>
  );
};

export default Dashboard;
