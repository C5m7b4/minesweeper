import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import ClickCounter from './ClickCounter';

afterEach(cleanup);

describe('Test ClickCounter', () => {
  it('should increase counter when the button is clicked', () => {
    render(<ClickCounter />);

    const counter = screen.getByRole('heading');
    const increaseButton = screen.getByRole('button', { name: '+' });
    const decreaseButton = screen.getByRole('button', { name: '-' });

    expect(counter.textContent).toBe('Count: 0');

    fireEvent.click(increaseButton);

    expect(counter.textContent).toBe('Count: 1');

    fireEvent.click(increaseButton);

    expect(counter.textContent).toBe('Count: 2');

    fireEvent.click(decreaseButton);

    expect(counter.textContent).toBe('Count: 1');

    fireEvent.click(decreaseButton);

    expect(counter.textContent).toBe('Count: 0');
  });
});
