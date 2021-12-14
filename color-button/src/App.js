import { useState } from 'react';

export const repalaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
} 

function App() {
  const [buttonColor, setbuttonColor] = useState('MediumVioletRed');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const newButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  const buttonColorHandler = () => {
    setbuttonColor((prev) => {
      return prev === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';
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
          Change to {repalaceCamelWithSpaces(newButtonColor)}
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
