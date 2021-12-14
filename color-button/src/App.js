import { useState } from 'react';

import './App.css';

function App() {
  const [buttonColor, setbuttonColor] = useState('red');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const buttonColorHandler = () => {
    setbuttonColor((prev) => {
      return prev === 'red' ? 'blue' : 'red';
    });
  };

  const buttonDisabledHandler = (event) => {
    setIsButtonDisabled(event.target.checked);
  };

  return (
    <div className="App">
      <div>
        <button
          onClick={buttonColorHandler}
          disabled={isButtonDisabled}
          style={
            isButtonDisabled
              ? { backgroundColor: 'gray' }
              : { backgroundColor: buttonColor }
          }
        >
          Change to {newButtonColor}
        </button>

        <input
          type="checkbox"
          id="disable-button-checkbox"
          onChange={buttonDisabledHandler}
          defaultChecked={isButtonDisabled}
        ></input>
        <label htmlFor="disable-button-checkbox">Disable button</label>
      </div>
    </div>
  );
}

export default App;
