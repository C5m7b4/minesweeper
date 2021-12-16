import React from 'react';
import ReactDOM from 'react-dom';
import { Top } from './components/Top/Top';

const root = document.getElementById('root');

ReactDOM.render(
  <Top feature="Flag" firstAction="ctrl" secondAction="click">
    Minesweeper
  </Top>,
  root
);
