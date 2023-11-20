// Footer.js
import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#4CAF50', // Green background color
    color: '#fff', // White text color
    padding: '10px', // Padding for content inside the footer
    textAlign: 'center', // Center-align the content
    position: 'fixed', // Fixed position at the bottom of the page
    width: '100%', // Stretch the footer across the entire width
    bottom: '0', // Stick the footer to the bottom of the page
  };

  return (
    <div style={footerStyle}>
      <p>&copy; 2023 Your Website Name</p>
    </div>
  );
};

export default Footer;