import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import { Options } from '../Options';
import OrderEntry from '../OrderEntry';

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

describe('grand total', () => {  
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');
    
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('1.50');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckbox);

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('2.00');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');

    expect(grandTotal).toHaveTextContent('0.00');
  });
});
