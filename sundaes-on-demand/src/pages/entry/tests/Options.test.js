import { render, screen } from '@testing-library/react';
import { Options } from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  const altTex = scoopImages.map((element) => element.alt);

  expect(altTex).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
