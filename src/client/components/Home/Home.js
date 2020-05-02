import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Login from './Login';

function Home() {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [ready, setReady] = useState(false);

  console.log(ready);
  return (ready
    ? <Redirect to={{ pathname: `${roomName}[${username}]`, state: { ready } }} />
    : (
      <Login
        roomName={roomName}
        setRoomName={setRoomName}
        username={username}
        setUsername={setUsername}
        ready={ready}
        setReady={setReady}
      />
    )
  );
}

export default withRouter(Home);
