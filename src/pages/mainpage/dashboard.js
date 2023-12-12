// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userData, refreshAccessToken } = useAuthContext();
  const navigate = useNavigate();
  const [randomData, setRandomData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetRandomData = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://139.59.156.28:5080/vlori_program/get_random_data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRandomData(data);
      } else if (response.status === 401) {
        await refreshAccessToken();
        handleGetRandomData(); // Retry the request with the new token
      } else {
        console.error('Error fetching random data:', response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData.isAuthenticated) {
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 0);

      return () => clearTimeout(redirectTimeout);
    }
  }, [userData.isAuthenticated, navigate]);

  return (
    <div className="dashboard-container">
      {userData.isAuthenticated ? (
        <div>
          <h1>Welcome to the Main Page!</h1>
          <p>Email: {userData.email}</p>
          <p>Password: {userData.password}</p>
          <p>Access Token: {userData.accessToken}</p>
          <p>Refresh Token: {userData.refreshToken}</p>

          <p>Am I Authenticated?: {userData.isAuthenticated}</p>

          {/* Button to trigger the API call */}
          <button onClick={handleGetRandomData} disabled={loading}>
            {loading ? 'Fetching Data...' : 'Get Random Data'}
          </button>

          {/* Display Random Data in a table */}
          {randomData && (
            <div>
              <h2>Random Data:</h2>
              <table>
                <thead>
                  <tr>
                    <th>Random Number</th>
                    <th>Random Word</th>
                  </tr>
                </thead>
                <tbody>
                  {randomData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.random_number}</td>
                      <td>{item.random_word}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p>You are not authenticated. Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
