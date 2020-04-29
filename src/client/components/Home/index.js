import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { setRoomState, setSocket } from '../../redux/actions';

import Login from './Login';
import Lobby from './Lobby';
import Game from './Game';

import { selectRoomState } from '../../redux/selectors';

const ENDPOINT = 'http://127.0.0.1:4001';

function Home() {
  const dispatch = useDispatch();
  const roomState = useSelector(selectRoomState);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('userReady', (users) => {
      setUsersList(users);
      dispatch(setRoomState(1));
    });

    socket.on('startGame', () => {
      dispatch(setRoomState(2));
    });

    dispatch(setSocket(socket));
    return () => socket.disconnect();
  }, []);

  switch (roomState) {
    case 0:
      return <Login />;
    case 1:
      return <Lobby usersList={usersList} />;
    case 2:
      return <Game />;
    default:
      return <p>Wooops an error occured</p>;
  }
}

export default Home;
