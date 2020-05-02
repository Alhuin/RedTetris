import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { selectSocket } from '../redux/selectors';

const checkParams = (roomName, username, setError) => {
  if (roomName === '' || username === '') {
    setError('Fields can\'t be blank');
    return false;
  }
  return true;
};

const checkRoomAvailable = (socket, roomName, username, setError, setReady) => socket.emit('isRoomAvailable', roomName, (data) => {
  if (data.status === true) {
    console.log('room available, needCreate ? ', data.needCreate);
    socket.emit(data.needCreate ? 'createRoom' : 'joinRoom', roomName, username, () => {
      console.log('setready');
      setReady(true);
    });
  } else {
    setError(data.error);
  }
});

function Home() {
  const socket = useSelector(selectSocket);
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  console.log(ready);
  return (ready
    ? <Redirect to={{ pathname: `${roomName}[${username}]`, state: { ready } }} />
    : (
      <>
        <div>
          <input
            type="text"
            placeholder="Login"
            onChange={(e) => {
              setUsername(e.target.value);
              if (ready) {
                setReady(false);
              }
            }}
          />
        </div>
        <div className="login">
          <span>Create new room</span>
          <input
            type="text"
            placeholder="Room name"
            onChange={(e) => {
              setRoomName(e.target.value);
              if (ready) {
                setReady(false);
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (checkParams(roomName, username, setError)) {
                checkRoomAvailable(socket, roomName, username, setError, setReady, dispatch);
              }
            }}
          >
            button
          </button>
        </div>
        <div>{error}</div>
      </>
    )
  );
}

export default withRouter(Home);
