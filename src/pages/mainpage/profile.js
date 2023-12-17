// Profile.js
import React, { useEffect } from 'react';
import { useAuthContext } from '../../authContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.isAuthenticated) {
      // Redirect to the login page when not authenticated
      navigate('/');
    }
  }, [userData.isAuthenticated, navigate]);

  return (
    <div className="profile-container">
      {userData.isAuthenticated ? (
        <div>
          <h1>User Profile</h1>
          <p>User ID: {userData.user.user_reg_ID}</p>
          <p>Email address: {userData.user.email_address}</p>
          <p>First Name: {userData.user.first_name}</p>
          <p>Last Name: {userData.user.last_name}</p>
          <p>Phone Number: {userData.user.phone_number}</p>

          <p>Access token?: {userData.accessToken}</p>
          <p>refresh token?: {userData.refreshToken}</p>

        </div>
      ) : (
        <p>You are not authenticated. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
