import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Game from './index';
import { selectSocket } from '../../redux/selectors';

const checkRoomAvailable = (socket, roomName, username, cb) => socket.emit('isRoomAvailable', roomName, (data) => {
  if (data.status === true) {
    console.log('room available, needCreate ? ', data.needCreate);
    socket.emit(data.needCreate ? 'createRoom' : 'joinRoom', roomName, username, () => {
      console.log('createe or join room');
      cb();
    });
  } else {
    console.log(data.error);
    cb();
  }
});

function Lobby({ match, location }) {
  const socket = useSelector(selectSocket);
  const [usersList, setUsersList] = useState([{}]);
  const [checked, setChecked] = useState(null);
  const [start, setStart] = useState(false);
  const { roomName, username } = match.params;
  const isMounted = useRef(true);
  const dispatch = useDispatch();
  let ready;

  if (location && location.state) {
    ready = location.state.ready;
  }

  useEffect(() => {
    socket.on('userReady', setUsersList);
    socket.on('start', (pieces) => {
      dispatch({ type: 'SET_PIECES', payload: pieces });
      setStart(true);
    });
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (ready === undefined) {
        checkRoomAvailable(socket, roomName, username, () => {
          socket.emit('checkRoomUser', roomName, username, (data) => {
            setChecked(data.status);
          });
        });
      } else {
        socket.emit('checkRoomUser', roomName, username, (data) => {
          setChecked(data.status);
        });
      }
    }
    return (() => {
      isMounted.current = false;
    });
  }, []);

  console.log('check ', checked);
  if (start) {
    return <Game roomName={roomName} username={username} />;
  }
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
