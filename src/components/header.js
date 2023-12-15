// Header.js
import React from "react";
import { useAuthContext } from "../authContext";

const Header = () => {
  const { logout } = useAuthContext();
  const { userData } = useAuthContext();
  return (
    <div className="header">
      <div className="left">
        <img src="https://lanman2018.ieee-lanman.org/files/2016/01/sample-logo@2x.png" />
        <h1>Vloris page</h1>
      </div>
      {userData.isAuthenticated &&
        <div className="middle">
          <ul>
            <li><a className="selected">Profile</a></li>
            <li><a>Work</a></li>
            <li><a>About</a></li>
            <li><a>Contact Us</a></li>
          </ul>
        </div>}
      <div className="right">
        {userData.isAuthenticated && <button className="logout-btn" onClick={logout}>Logout</button>}
      </div>
    </div>
  );
};

export default Header;
