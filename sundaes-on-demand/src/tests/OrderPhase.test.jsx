import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.click(cherriesCheckbox);

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  // find and click order button
  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });

  userEvent.click(orderButton);

  // check summary information based on order
  const summaryTitle = screen.getByRole('heading', { name: 'Order Summary' });
  const scoopsValue = screen.getByRole('heading', { name: 'Scoops: $2.00' });
  const scoopsItems = screen.getByText('1 Vanilla');
  const toppingsValue = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  const toppingsItems = screen.getByText('Cherries');

  expect(summaryTitle).toBeInTheDocument();
  expect(scoopsValue).toBeInTheDocument();
  expect(scoopsItems).toBeInTheDocument();
  expect(toppingsValue).toBeInTheDocument();
  expect(toppingsItems).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  });

  userEvent.click(termsAndConditionsCheckbox);
  userEvent.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // confirm order number on confirmation page
  screen.debug();
  const orderNumber = await screen.findByText(/order number/i);

  expect(orderNumber).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: 'Create new order',
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  const toppingsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('toppings header is not on summary page if no toppings ordered', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  // find and click order button
  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });

  userEvent.click(orderButton);

  // check summary information based on order
  const scoopsValue = screen.getByRole('heading', { name: 'Scoops: $2.00' });

  const toppingsValue = screen.queryByRole('heading', {
    name: /toppings/i,
  });

  expect(scoopsValue).toBeInTheDocument();
  expect(toppingsValue).not.toBeInTheDocument();
});
