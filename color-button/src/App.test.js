import { render, screen, fireEvent } from '@testing-library/react';
import { repalaceCamelWithSpaces } from './App';
import App from './App';

test('button has initial color', () => {
  // GIVEN
  render(<App />);

  // WHEN
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //THEN
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  expect(checkbox).not.toBeChecked();
});

test('button should have correct state according to checkbox', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox');

  expect(colorButton).toBeEnabled();

  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
});

test('button should have gray color when is disabled', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);

  expect(button).toHaveStyle({ backgroundColor: 'gray' });
});

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(repalaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('works for one inner capital letter', () => {
    expect(repalaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('works for multiple inner capital letters', () => {
    expect(repalaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
