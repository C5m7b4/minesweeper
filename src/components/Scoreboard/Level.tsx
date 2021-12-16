import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface LevelProps {
  /**
   * Array of possible game levels
   */
  children: string[];
}

export const Level: FC<LevelProps> = ({ children }) => (
  <Select>
    {children.map((c: string) => (
      <Option key={`l-${c}`} value={c}>
        {c}
      </Option>
    ))}
  </Select>
);

const Select = styled.select`
  margin: 0;
  height: 2.5vw;
  border-radius: 5px;
  border: 0.15vw solid;
  border-color: white #9e9e9e #9e9e9e white;
  background-color: white;
`;

const Option = styled.option`
  font-weight: normal;
  dislay: block;
  white-space: nowrap;
  in-height: 1.2em;
  padding: 0 0.2vw 0.2vw;
`;