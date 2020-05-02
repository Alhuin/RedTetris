import React from 'react';
import { StyledLobby } from '../styles/StyledLobby';

const Lobby = () => {
  const users = [{ name: 'Alhuin', isAdmin: true }];
  return (
    <StyledLobby>
      Joueurs:
      <ul>
        {users.map((user) => (
          <li>
            {user.name}
            {user.isAdmin ? ' (Admin)' : ''}
          </li>
        ))}
      </ul>
      {users.length === 1
        ? <p>En attente d&apos;un challenger</p>
        : null}
    </StyledLobby>
  );
};

export default Lobby;
