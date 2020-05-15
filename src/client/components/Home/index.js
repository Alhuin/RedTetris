import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import { selectReady, selectRoomName, selectUsername } from '../../redux/selectors';

import Login from './Login';
import Loader from '../Loader';

function Home() {
  const roomName = useSelector(selectRoomName);
  const username = useSelector(selectUsername);
  const ready = useSelector(selectReady);
  const socket = useSelector((state) => state.socket);
  const isMounted = useRef(true);
  const [serverStatus, setServerStatus] = useState(true);

  useEffect(() => {
    if (isMounted.current) {
      socket.on('connect', () => setServerStatus(true));
      socket.on('connect_error', () => setServerStatus(false));
    }
    return (() => {
      isMounted.current = false;
    });
  }, [socket]);

  if (!serverStatus) {
    console.log('server down');
    return <Loader />;
  }
  // if user is ready (true on JOIN_ROOM_SUCCESS) go to Tetris component, else go to Login
  return (ready
    ? <Redirect to={{ pathname: `${roomName}[${username}]`, state: { ready } }} />
    : (
      <Login ready={ready} />
    )
  );
}

export default withRouter(Home);
