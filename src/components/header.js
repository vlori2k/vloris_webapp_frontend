import React from "react";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../authContext";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {
  const { logout, userData } = useAuthContext();

  return (
    <Paper elevation={3} className="header" style={{ backgroundColor: '#87CEEB', padding: '10px' }}>
      <div className="left" style={{ marginRight: '20px' }}>
        <img src="https://lanman2018.ieee-lanman.org/files/2016/01/sample-logo@2x.png" alt="Logo" />
        <Typography variant="h6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold' }}>Vloris page</Typography>
      </div>
      
      {userData.isAuthenticated && (
        <div className="middle">
          <ul className="nav-list">
            <li><Link to="/profile" className="nav-link selected">Profile</Link></li>
            <li><Link to="/work" className="nav-link">Work</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
          </ul>
        </div>
      )}

      <div className="right">
        {userData.isAuthenticated && <Button className="logout-btn" onClick={logout} variant="outlined">Logout</Button>}
      </div>
    </Paper>
  );
};

export default Header;
