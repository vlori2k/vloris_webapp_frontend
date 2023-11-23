import React from "react";
import "./styles/styles.scss"; // Import your main CSS file

import Header from "./components/header.js";
import Input from "./components/input.js";
import Footer from "./components/footer.js";
import MuscleGroupComponent from "./components/muscleGroupsComponent.js";
import Sidebar from "./components/side_bar/Sidebar";
import LoginPage from "./pages/loginpage/LoginPage.js";

const App = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <div className="main-content">
          <LoginPage />
          {/* Other components or content */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
