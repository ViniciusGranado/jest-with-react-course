import { useState } from 'react';

import './App.css';

function App() {
  const [buttonColor, setbuttonColor] = useState('red');

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const buttonColorHandler = () => {
    setbuttonColor((prev) => {
      return prev === 'red' ? 'blue' : 'red';
    });
  };

  return (
    <div className="App">
      <div>
        <button
          style={{ backgroundColor: buttonColor }}
          onClick={buttonColorHandler}
        >
          Change to {newButtonColor}
        </button>
      </div>
    </div>
  );
}

export default App;
