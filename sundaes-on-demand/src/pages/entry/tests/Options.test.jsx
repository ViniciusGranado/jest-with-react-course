import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  const altTex = scoopImages.map((element) => element.alt);

  expect(altTex).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each scoop toppings from server', async () => {
  render(<Options optionType="toppings" />);

  const scoopImages = await screen.findAllByRole('img', { name: /topping$/i });

  expect(scoopImages).toHaveLength(3);

  const altTex = scoopImages.map((element) => element.alt);

  expect(altTex).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test('should not update scoops total for invalid input', async () => {
  render(<Options optionType={'scoops'} />);

  const input = await screen.findByRole('spinbutton', { name: /vanilla/i });
  const scoopsTotal = await screen.findByText(/scoops total/i);

  userEvent.clear(input);
  userEvent.type(input, '-1');


  expect(scoopsTotal).toHaveTextContent('0.00');
});
