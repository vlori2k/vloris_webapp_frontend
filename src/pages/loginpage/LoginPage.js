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
        saveLoginData(responseData);
        setError({ status: null, message: null });
        console.log('Login successful:', responseData);
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
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
