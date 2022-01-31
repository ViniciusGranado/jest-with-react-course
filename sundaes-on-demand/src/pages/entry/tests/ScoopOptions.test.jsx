import { render, screen } from '@testing-library/react';
import { ScoopOptions } from '../ScoopOptions';
import userEvent from '@testing-library/user-event';

test('ScoopOption inputs become red when user inputs invalid number', () => {
  render(<ScoopOptions updateItemCount={jest.fn()}/>);

  const input = screen.getByRole('spinbutton');

  userEvent.clear(input);
  userEvent.type(input, '-1');
  expect(input).toHaveClass('is-invalid');

  userEvent.clear(input);
  userEvent.type(input, '2.5');
  expect(input).toHaveClass('is-invalid');

  userEvent.clear(input);
  userEvent.type(input, '11');
  expect(input).toHaveClass('is-invalid');

  userEvent.clear(input);
  userEvent.type(input, '3');
  expect(input).not.toHaveClass('is-invalid');
});
