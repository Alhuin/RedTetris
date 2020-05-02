import React from 'react';

import { initStage } from './helpers';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButtton';
import { StyledTetris, StyledTetrisWrapper } from '../styles/StyledTetris';
import Lobby from './Lobb';

const Tetris = () => (
  <StyledTetrisWrapper>
    <StyledTetris>
      <Stage stage={initStage()} />
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
          <Lobby />
        </div>
        <StartButton />
      </aside>
    </StyledTetris>
  </StyledTetrisWrapper>
);

export default Tetris;
