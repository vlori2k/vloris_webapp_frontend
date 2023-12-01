import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../authContext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({ status: null, message: null });
  
  const { loginAccepted } = useAuthContext();


  console.log('YOYOYOYO:', loginAccepted);
  
  
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const loginData = {
      email_address: email,
      password: password,
    };

    try {
      const response = await fetch('https://restapi-main-01.woit.net/login/standard_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();

        
        loginAccepted(responseData);

        // Clear any previous errors
        setError({ status: null, message: null });

        console.log('Login successful:', responseData);

        // Redirect to the main page
        navigate('/dashboard');

        // Add your logic to handle the successful login response here
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);

        // Set the error state to display on the page
        setError({ status: response.status, message: errorData.message_code || 'Unknown error' });
        
        // Add your logic to handle the failed login response here
      }
    } catch (error) {
      console.error('Error during login:', error);

      // Set the error state to display on the page
      setError({ status: null, message: `Error during login: ${error.message}` });
      
      // Add your logic to handle the error here
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="logo">Your Logo Here</div>
        <div className="form-wrapper">
          <div className="input-wrapper">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="input-wrapper">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>

          {/* Display error message if there is an error */}
          {error.status && (
            <div className="error-message">
              HTTP error {error.status}: {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;