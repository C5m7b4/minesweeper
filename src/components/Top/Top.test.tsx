import React from 'react';
import { render } from '@testing-library/react';
import { Top } from './Top';

it('should render correctly', () => {
  const { asFragment } = render(
    <Top feature={'flag'} firstAction={'ctrl'} secondAction={'click'}>
      minesweeper
    </Top>
  );
  expect(asFragment).toMatchSnapshot();
});
