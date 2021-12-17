import React, { FC, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { Counter } from './Counter';
import { Level } from './Level';
import { Reset } from './Reset';

export interface ScoreboardProps {
  /**
   * Timer
   */
  time: string;
  /**
   * Possible game scenarios
   */
  levels: string[];
  /**
   * Action handler to reset the game
   */
  onReset: () => void;
  /**
   * Bombs in the field
   */
  mines: string;
  /**
   * default level selected
   */
  defaultLevel?: string;

  /**
   * action handler for selecting new level
   */
  onChangeLevel: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Scoreboard: FC<ScoreboardProps> = ({
  time,
  levels,
  onReset,
  onChangeLevel,
  mines,
}) => {
  return (
    <Wrapper>
      <Counter>{time}</Counter>
      <Level onChange={onChangeLevel}>{levels}</Level>
      <Reset onReset={onReset} />
      <Counter>{mines}</Counter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding-bottom: 2vw;
  justify-content: space-between;
`;
