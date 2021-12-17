import React, { FC, useState, useCallback, useEffect } from 'react';

import { GameArea, Wrapper, GameOver } from '../../components/Game';
import { Field, emptyFieldGenerator, CellState } from '../../helpers/Field';
import { Top } from '../../components/Top/Top';
import { Scoreboard } from '../../components/Scoreboard';
import { Grid } from '../../components/Grid/Grid';
import { GameLevels, LevelNames, GameSettings } from '../GameSettings';

interface GameProps {
  children: Field;
}

export const GameWithHooks: FC = () => {
  const [level, setLevel] = useState<LevelNames>('beginner');
  const [size, bombs] = GameSettings[level];

  useEffect(() => {}, [level]);
  const playerField = emptyFieldGenerator(size, CellState.hidden);

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      setLevel(level as LevelNames),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  return (
    <Wrapper>
      <Top feature="flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time="0"
          mines="10"
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onReset={() => null}
          onChangeLevel={onChangeLevelHandler}
        />
        <GameOver onClick={() => null} isWin={true} />
        <Grid onClick={() => null} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
