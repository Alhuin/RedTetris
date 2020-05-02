import React from 'react';
import TestGrid from './TestGrid.js';

function Game({ roomName, username }) {
  return (
    <div id="gameContainer">
      {/* <infos /> */}
      <TestGrid />
      {/* <pieces /> */}
    </div>
  );
}

export default Game;
