import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has initial color', () => {
  // GIVEN
  render(<App />);

  // WHEN
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //THEN
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});
  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to red'});
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})
