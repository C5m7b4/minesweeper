import React, { FC } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Reset } from './Reset';

describe('Reset button check', () => {
  const ResetWithDummyHandlerOnReset: FC = () => <Reset onReset={() => null} />;

  it('should render component', () => {
    render(<ResetWithDummyHandlerOnReset />);
    expect(screen.getByText('🙂')).toBeInTheDocument();
  });
  it('onReset handler should be called', () => {
    const onReset = jest.fn();
    render(<Reset onReset={onReset} />);
    fireEvent.click(screen.getByText('🙂'));
    expect(onReset).toBeCalled();
  });
  it('should change state when onMouseDown and onMouseup events happened', () => {
    render(<ResetWithDummyHandlerOnReset />);
    fireEvent.mouseDown(screen.getByText('🙂'));
    expect(screen.getByText('😵')).toBeInTheDocument();
    fireEvent.mouseUp(screen.getByText('😵'));
    expect(screen.getByText('🙂')).toBeInTheDocument();
  });
  it('should change state when mousedown and mouseleave events happen', () => {
    render(<ResetWithDummyHandlerOnReset />);
    fireEvent.mouseDown(screen.getByText('🙂'));
    expect(screen.getByText('😵')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByText('😵'));
    expect(screen.getByText('🙂')).toBeInTheDocument();
  });
});
