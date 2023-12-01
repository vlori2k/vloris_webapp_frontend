// mainpage.js

import React from 'react';
import { useAuthContext } from '../../authContext';


const Dashboard = () => {
  return (
    
    <div className="dashboard-container">
      <h1>Welcome to the Main Page!</h1>
      <p>This is a funny message or any content you want to display.</p>
    </div>
  );
};

export default Dashboard;
