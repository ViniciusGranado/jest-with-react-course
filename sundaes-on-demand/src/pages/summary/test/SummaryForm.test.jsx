import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SummaryForm } from '../SummaryForm';

test('Initial conditions', () => {
  // GIVEN
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const button = screen.getByRole('button', { name: 'Confirm order' });

  // THEN
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('checkbox disables button on first click and enables on second click', () => {
  // GIVEN
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const button = screen.getByRole('button', { name: 'Confirm order' });

  // THEN
  userEvent.click(checkbox);

  expect(button).toBeEnabled();

  userEvent.click(checkbox);

  expect(button).toBeDisabled();
});
test('popover responds to hover', async () => {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
