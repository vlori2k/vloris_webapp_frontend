// Header.js
import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#4CAF50', // Green background color
    color: '#fff', // White text color
    padding: '15px', // Padding for content inside the header
    textAlign: 'center', // Center-align the content
    position: 'fixed', // Fixed position at the top of the page
    width: '100%', // Stretch the header across the entire width
    top: '0', // Stick the header to the top of the page
    zIndex: '1000', // Set a high z-index to ensure it's above other elements
  };

  return (
    <div style={headerStyle}>
      <h1>Vloris page</h1>
    </div>
  );
};

export default Header;