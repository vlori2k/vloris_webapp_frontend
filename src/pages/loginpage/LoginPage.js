// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import your LoginPage.css file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // You can send the data to your authentication server here
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
