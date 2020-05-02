import React from 'react';
import { StyledLobby } from '../styles/StyledLobby';

const Lobby = ({ users }) => {
  console.log(users);
  return (
    <StyledLobby>
      Joueurs:
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            {user.isAdmin ? ' (Admin)' : ''}
          </li>
        ))}
      </ul>
      {/* {users.length === 1 */}
      {/*  ? <p>En attente d&apos;un challenger</p> */}
      {/*  : null} */}
    </StyledLobby>
  );
};


export default Lobby;
