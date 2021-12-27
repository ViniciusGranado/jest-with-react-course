import { render, screen, fireEvent } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';

test('Initial conditions', () => {
  // GIVEN
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const button = screen.getByRole('button', { name: 'Confirm order' });

  // THEN
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('checkbox disables button on first click and enables on second click', () => {
  // GIVEN
  render(<SummaryForm />);
  
  const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const button = screen.getByRole('button', { name: 'Confirm order' });

  // THEN
  fireEvent.click(checkbox);

  expect(button).toBeEnabled();

  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
});