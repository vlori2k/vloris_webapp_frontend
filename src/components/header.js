// Header.js
import React from "react";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../authContext";

const Header = () => {
  const { logout } = useAuthContext();
  const { userData } = useAuthContext();

  return (
    <div className="header">
      <div className="left">
        <img src="https://lanman2018.ieee-lanman.org/files/2016/01/sample-logo@2x.png" alt="Logo" />
        <h1>Vloris page</h1>
      </div>
      {userData.isAuthenticated &&
        <div className="middle">
          <ul>
            <li><Link to="/profile" className="selected">Profile</Link></li>
            <li><Link to="/work">Work</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>}
      <div className="right">
        {userData.isAuthenticated && <button className="logout-btn" onClick={logout}>Logout</button>}
      </div>
    </div>
  );
};

export default Header;
