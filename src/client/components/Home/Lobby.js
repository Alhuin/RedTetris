import React from 'react';
import { useSelector } from 'react-redux';

import { selectSocket } from '../../redux/selectors';

function Lobby({ usersList }) {
  const socket = useSelector(selectSocket);

  console.log('userslist ', usersList);
  return (
    <>
      <ul>
        {
            usersList.map((user) => (
              <li key={user.id.toString()}>
                {user.name}
                {user.isAdmin ? ' (admin)' : ''}
              </li>
            ))
          }
      </ul>
      {
        usersList.length === 1
          ? (
            <>
              <p>Waiting for another player...</p>
              <button
                type="button"
                onClick={() => socket.emit('startGame')}
              >
                Solo anyway !
              </button>
            </>
          )
          : (
            <button
              type="button"
              onClick={() => socket.emit('startGame')}
            >
              Let&apos;s go !
            </button>
          )
      }
    </>
  );
}

export default Lobby;
