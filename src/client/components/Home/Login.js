import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSocket } from '../../redux/selectors';

function Login() {
  const socket = useSelector(selectSocket);
  const [createName, setCreateName] = useState('');
  const [joinName, setJoinName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <>
      <div>
        <input type="text" placeholder="Login" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="create">
        <div>
          <span>Create new room</span>
          <input type="text" placeholder="Room name" value={createName} onChange={(e) => setCreateName(e.target.value)} />
          <button
            type="button"
            onClick={() => socket.emit('createRoom', createName, username)}
          >
            Create
          </button>
        </div>
        <div>
          <span>Join existing room</span>
          <input type="text" placeholder="Room code" value={joinName} onChange={(e) => setJoinName(e.target.value)} />
          <button
            type="button"
            onClick={() => socket.emit('joinRoom', joinName, username)}
          >
            Join
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
