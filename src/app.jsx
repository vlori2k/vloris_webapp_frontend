import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./styles/styles.scss"; // Import your main CSS file

import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Sidebar from "./components/side_bar/Sidebar";
import LoginPage from "./pages/loginpage/loginPage.js";
import Dashboard from "./pages/mainpage/dashBoard.js"; 
import { AuthProvider } from './authContext';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <div className="main-wrapper">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
