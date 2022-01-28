import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import { Options } from '../Options';

test('update scoop subtotal when scoops change', async () => {
  // GIVEN
  render(<Options optionType="scoops" />);
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // WHEN

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  // THEN

  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // WHEN

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  // THEN

  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  const mandmsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });

  expect(toppingsSubtotal).toHaveTextContent('0.00');

  userEvent.click(cherriesCheckbox);

  expect(toppingsSubtotal).toHaveTextContent('1.50');

  userEvent.click(mandmsCheckbox);

  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(cherriesCheckbox);

  expect(toppingsSubtotal).toHaveTextContent('1.50');
});
