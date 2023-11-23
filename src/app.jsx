import React from 'react';
import './App.css'; // Import your main CSS file

import Header from './components/header.js';
import Input from './components/input.js';
import Footer from './components/footer.js';
import MuscleGroupComponent from './components/muscleGroupsComponent.js';
import Sidebar from './components/side_bar/Sidebar';
import LoginPage from './pages/loginpage/LoginPage.js';

const App = () => {
  return (
    <div id="root">
      <Sidebar />

        <Header />
        <LoginPage />
        {/* Other components or content */}
        <Footer />

    </div>
  );
};

export default App;
