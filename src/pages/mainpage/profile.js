import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../authContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Profile = () => {
  const { userData, saveLoginData } = useAuthContext();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    firstName: userData.user?.first_name || '',
    lastName: userData.user?.last_name || '',
    phoneNumber: userData.user?.phone_number || '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Redirect to the login page when not authenticated
    if (!userData.isAuthenticated) {
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 0);

      return () => clearTimeout(redirectTimeout);
    }
  }, [userData.isAuthenticated, navigate]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveEdit = async () => {
    try {
      // Prepare the data for the PUT request
      const requestData = {
        user_reg_ID: userData.user?.user_reg_ID,
        first_name: editedUserInfo.firstName,
        last_name: editedUserInfo.lastName,
        phone_number: editedUserInfo.phoneNumber,
      };

      // Send the PUT request to the server
      const response = await fetch('http://139.59.156.28:5080/vlori_program/edit_user_data', {
        method: 'PUT', // Assuming the server supports PUT for updating user data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // If the PUT request is successful, refresh the profile page
        saveLoginData({
          ...userData,
          user: {
            ...userData.user,
            first_name: editedUserInfo.firstName,
            last_name: editedUserInfo.lastName,
            phone_number: editedUserInfo.phoneNumber,
          },
        });

        // Exit edit mode
        setEditMode(false);
      } else {
        // If there is an error, log the error and show a Snackbar
        console.error('Error updating user data:', response.status);
        setSnackbarMessage(`Error updating user data: ${response.status}`);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors if any
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      <Card style={{ backgroundColor: '#87CEEB', height: '60px' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              User ID:
            </span>
            {userData.user?.user_reg_ID || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#87CEEB', height: '60px', display: 'flex', alignItems: 'center' }}>
        <CardContent>
          <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              First Name:
            </span>
            {editMode ? (
              <TextField
                size="small"
                value={editedUserInfo.firstName}
                onChange={(e) =>
                  setEditedUserInfo({
                    ...editedUserInfo,
                    firstName: e.target.value,
                  })
                }
              />
            ) : (
              userData.user?.first_name || 'N/A'
            )}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#87CEEB', height: '60px', display: 'flex', alignItems: 'center' }}>
        <CardContent>
          <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Last Name:
            </span>
            {editMode ? (
              <TextField
                size="small"
                value={editedUserInfo.lastName}
                onChange={(e) =>
                  setEditedUserInfo({
                    ...editedUserInfo,
                    lastName: e.target.value,
                  })
                }
              />
            ) : (
              userData.user?.last_name || 'N/A'
            )}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#87CEEB', height: '60px', display: 'flex', alignItems: 'center' }}>
        <CardContent>
          <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Phone Number:
            </span>
            {editMode ? (
              <TextField
                size="small"
                value={editedUserInfo.phoneNumber}
                onChange={(e) =>
                  setEditedUserInfo({
                    ...editedUserInfo,
                    phoneNumber: e.target.value,
                  })
                }
              />
            ) : (
              userData.user?.phone_number || 'N/A'
            )}
          </Typography>
        </CardContent>
      </Card>

      <div style={{ marginTop: '16px' }}>
        {editMode ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
              style={{ marginRight: '8px' }}
            >
              Save
            </Button>
            <Button variant="contained" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit Info
          </Button>
        )}
      </div>

      {/* Snackbar for displaying error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Profile;
