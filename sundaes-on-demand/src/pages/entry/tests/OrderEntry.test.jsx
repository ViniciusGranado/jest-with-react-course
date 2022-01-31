import { screen, render, waitFor } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import OrderEntry from '../OrderEntry';

import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});

test.only('order sundae should be disabled when no scoops are selected', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = screen.getByRole('button', { name: /order/i });
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  expect(orderButton).toBeDisabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(orderButton).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');

  expect(orderButton).toBeDisabled();
})
