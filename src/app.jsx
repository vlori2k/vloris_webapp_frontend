import React from 'react';
import TodoComponent from './components/todoComponent.js'; // Update the path accordingly

const App = () => {
  return (
    <div>
      {/* Add your TodoComponent to render the fetched data */}
      <TodoComponent />

      {/* Add a button to trigger data fetching (if needed in the future) */}
      {/* <button onClick={() => TodoComponent.fetchData()}>Fetch Data</button> */}
    </div>
  );
};

export default App;
