import React from 'react';
import PropTypes from 'prop-types';
import StyledLobby from '../styles/StyledLobby';

const Lobby = ({ users }) => (
  <StyledLobby>
    Joueurs:
    <ul>
      {users.map((user) => (
        <li key={user.name}>
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

Lobby.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Lobby;
