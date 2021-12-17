import React from 'react';
import { render } from '@testing-library/react';

import { Legend } from './Legend';

it('should render correctly', () => {
  const { asFragment } = render(
    <Legend feature={'flag'} firstAction={'ctrl'} secondAction={'click'} />
  );
  expect(asFragment).toMatchSnapshot();
});
