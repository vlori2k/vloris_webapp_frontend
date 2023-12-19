import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/styles.scss"; // Import your main CSS file

import Header from "./components/header.js";
import Footer from "./components/footer.js";
//import Sidebar from "./components/side_bar/Sidebar.js";
import LoginPage from "./pages/loginpage/loginPage.js";
import Dashboard from "./pages/mainpage/dashBoard.js";
import Profile from "./pages/mainpage/profile.js";
import { AuthProvider } from "./authContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <div className="main-wrapper">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} /> {/* Add the profile route */}
              {/* Add more routes if needed */}
            </Routes>
          </div>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;

