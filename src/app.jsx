import React from 'react';

import Header from './components/header.js';
import Input from './components/input.js';
import Footer from './components/footer.js';

import MuscleGroupComponent from './components/muscleGroupsComponent.js';


const App = () => {
  return (
    <div>
      <Header />
      <main>

        <MuscleGroupComponent />
        <Input />
      </main>
      <Footer />
    </div>
  );
}; 

export default App;
