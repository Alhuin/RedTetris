import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import {
  setRoomName, setUsername,
} from '../../redux/actions';
import { selectRoomName, selectUsername } from '../../redux/selectors';

import Login from './Login';

function Home() {
  const roomName = useSelector(selectRoomName);
  const username = useSelector(selectUsername);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  return (ready
    ? <Redirect to={{ pathname: `${roomName}[${username}]`, state: { ready } }} />
    : (
      <Login
        setRoomName={(value) => setRoomName(value, dispatch)}
        setUsername={(value) => setUsername(value, dispatch)}
        ready={ready}
        setReady={setReady}
      />
    )
  );
}

export default withRouter(Home);
