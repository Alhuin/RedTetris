import React from 'react';

function Game({ roomName, username }) {
  return (
    <p>
      User
      {username}
      {' '}
      joined
      {roomName}
    </p>
  );
}

export default Game;
