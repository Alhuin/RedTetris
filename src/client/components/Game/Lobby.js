import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectSocket } from '../../redux/selectors';

function Lobby({ match }) {
  const socket = useSelector(selectSocket);
  const [usersList, setUsersList] = useState([]);
  const [checked, setChecked] = useState(null);

  const { roomName, username } = match.params;

  useEffect(() => {
    socket.emit('checkRoomUser', roomName, username, (data) => {
      setChecked(data.status);
    });
    socket.on('userReady', (users) => setUsersList(users));
  }, []);

  if (checked === null) {
    return <></>;
  }
  if (checked === false) {
    return <Redirect to="/" />;
  }
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
