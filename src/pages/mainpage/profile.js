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
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Added state for success message
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Redirect to the login page when not authenticated
    if (!userData.isAuthenticated) {
      navigate('/');
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
      const response = await fetch('http://139.59.156.28:5080/user_auth/change_user_info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log("PART 1:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
      console.log(userData.accessToken);
      console.log(userData.refreshToken);      
      console.log();


      console.log('Response Status:', response.status);

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

        
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log("aaaand PART 2:: WHAT IS TOKEN AND ACCESS TOKEN HERE?");
        console.log(userData.accessToken);
        console.log(userData.refreshToken);      
        console.log();

        
        // Set success message and severity
        setSuccessMessage('User information updated successfully');
        setSnackbarSeverity('success');

        // Open the Snackbar for success messages
        setSnackbarOpen(true);

        // Exit edit mode
        setEditMode(false);
      } else {
        // If there is an error, log the error and show an error Snackbar
        console.error('Error updating user data:', response.status);
        setSnackbarMessage(`Error updating user data: ${response.status}. Network error: ${response.statusText}`);
        setSnackbarSeverity('error');

        // Open the Snackbar for error messages
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

      <Card style={{ backgroundColor: '#87CEEB', height: '60px' }}>
      <CardContent>
        <Typography variant="body1">
          <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
            User Role:
          </span>
          {userData.user?.user_role_ID === 1 ? (
            'You are SUPER SUPER admin'
          ) : userData.user?.user_role_ID === 2 ? (
            'You are an admin'
          ) : (
            'N/A'
          )}
        </Typography>
      </CardContent>
    </Card>


      <Card style={{ backgroundColor: '#87CEEB', height: '60px' }}>
        <CardContent>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Email Address:
            </span>
            {userData.user?.email_address || 'N/A'}
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

      {/* Snackbar for displaying error or success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarSeverity === 'success' ? successMessage : snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Profile;
