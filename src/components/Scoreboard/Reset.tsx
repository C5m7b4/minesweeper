import React, { FC, useState } from 'react';
import styled from '@emotion/styled';

import { useMouseDown } from '../../hooks/useMouseDown';

export interface ResetProps {
  /**
   * Reset action handler
   */
  onReset: () => void;
}

export const Reset: FC<ResetProps> = ({ onReset }) => {
  const [mouseDown, setMouseDown, setMouseUp] = useMouseDown();

  return (
    <Button
      onMouseLeave={setMouseUp}
      onMouseUp={setMouseUp}
      onMouseDown={setMouseDown}
      onClick={onReset}
    >
      {mouseDown ? '😵' : '🙂'}
    </Button>
  );
};

const Button = styled.button`
  font-size: 1.5vw;
  cursor: pointer;
  border-width: 0.15vw;
  border-style: solid;
  background-color: #d1d1d1;
  border-color: white #9e9e9e #9e9e9e white;
  border-radius: 5px;
  padding-bottom: 3px;
`;
