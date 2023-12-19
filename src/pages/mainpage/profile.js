import React, { useEffect } from 'react';
import { useAuthContext } from '../../authContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Profile = () => {
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the login page when not authenticated
    if (!userData.isAuthenticated) {
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 0);

      return () => clearTimeout(redirectTimeout);
    }
  }, [userData.isAuthenticated, navigate]);

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      <Card style={{ backgroundColor: '#FFC0CB' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              User ID:
            </span>
            {userData.user?.user_reg_ID || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#87CEEB' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Email address:
            </span>
            {userData.user?.email_address || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#98FB98' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              First Name:
            </span>
            {userData.user?.first_name || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#FFD700' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Last Name:
            </span>
            {userData.user?.last_name || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#FFA07A' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Phone Number:
            </span>
            {userData.user?.phone_number || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#FFD700' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Access token:
            </span>
            {userData.accessToken || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#87CEEB' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Refresh token:
            </span>
            {userData.refreshToken || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
