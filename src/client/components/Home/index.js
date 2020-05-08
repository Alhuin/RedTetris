import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import { selectReady, selectRoomName, selectUsername } from '../../redux/selectors';

import Login from './Login';

function Home() {
  const roomName = useSelector(selectRoomName);
  const username = useSelector(selectUsername);
  const ready = useSelector(selectReady);

  if (ready) {
    console.log('isReady, path= ', `${roomName}[${username}]`);
  }
  console.log('indeex ready = ', ready);
  return (ready
    ? <Redirect to={{ pathname: `${roomName}[${username}]`, state: { ready } }} />
    : (
      <Login ready={ready} />
    )
  );
}

export default withRouter(Home);
