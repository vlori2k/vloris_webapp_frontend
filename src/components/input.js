// Input.js
import React, { useState } from 'react';

const Input = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`You entered: ${inputValue}`);
    // Add further logic as needed
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
};

export default Input;
