import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../authContext';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const LoginPage = () => {
  const [error, setError] = useState({ status: null, message: null });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { saveLoginData } = useAuthContext();
  const { saveAccessToken } = useAuthContext();
  const { saveRefreshToken } = useAuthContext();


  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://139.59.156.28:5080/user_auth/standard_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: document.getElementById('email').value,
          password: document.getElementById('password').value,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Log successful login data
        console.log('Login successful. Response data:', responseData);

        // Save login data to context
        saveLoginData(responseData);
        saveAccessToken(responseData.access_token);
        saveRefreshToken(responseData.refresh_token, responseData.token_expire_time);
        // Reset error state
        setError({ status: null, message: null });

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        const errorData = await response.json();

        // Log login failure data
        console.log('Login failed. Error data:', errorData);

        // Set error state
        setError({
          status: response.status,
          message: errorData.detail || response.statusText || 'Unknown error',
        });

        // Show the Snackbar
        setOpenSnackbar(true);

        // Close the Snackbar after 2 seconds
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 2000);
      }
      
    } catch (error) {
      console.error('Error during login:', error);

      // Set error state
      setError({ status: null, message: `Error during login: ${error.message}` });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="logo">Your Logo Here</div>
        <div className="form-wrapper">
          <div className="input-wrapper">
            <label>Email:</label>
            <input type="email" id="email" />
          </div>
          <div className="input-wrapper">
            <label>Password:</label>
            <input type="password" id="password" />
          </div>
          {/* Replace the standard button with Material-UI Button */}
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>

          {/* Adjusted Snackbar placement */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert elevation={6} variant="filled" severity="error">
              {`HTTP error ${error.status}: ${error.message}`}
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
