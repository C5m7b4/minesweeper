import React from 'react';
import ReactDOM from 'react-dom';
import { Top } from './components/Top/Top';
import { Scoreboard } from './components/Scoreboard';

const root = document.getElementById('root');

ReactDOM.render(
  <>
    <Top feature="Flag" firstAction="ctrl" secondAction="click">
      Minesweeper
    </Top>
    <Scoreboard
      time="000"
      levels={['beginner', 'intermediate', 'expert']}
      mines={'010'}
      onReset={() => null}
    />
  </>,
  root
);
