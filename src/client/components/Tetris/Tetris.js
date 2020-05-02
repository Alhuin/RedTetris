import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { initStage, checkRoomAvailable } from './helpers';
import Stage from './Stage';
import Display from './Display';
import Lobby from './Lobby';
import StartButton from './StartButtton';
import { StyledTetris, StyledTetrisWrapper } from '../styles/StyledTetris';
import { selectSocket } from '../../redux/selectors';

const Tetris = ({ match, location }) => {
  const socket = useSelector(selectSocket);
  const [users, setUsers] = useState([{}]);
  const [checked, setChecked] = useState(null);
  const { roomName, username } = match.params;
  const isMounted = useRef(true);
  let ready;

  if (location && location.state) {
    ready = location.state.ready;
  }

  useEffect(() => {
    socket.on('userReady', setUsers);
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

  if (checked === null) {
    return <></>;
  }
  if (checked === false) {
    return <Redirect to="/" />;
  }
  return (
    <StyledTetrisWrapper>
      { checked
        ? (
          <StyledTetris>
            <Stage stage={initStage()} />
            <aside>
              <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
                <Lobby users={users} />
              </div>
              <StartButton mode="Solo" />
            </aside>
          </StyledTetris>
        )
        : <p style={{ color: 'white' }}>chargement...</p>}
    </StyledTetrisWrapper>
  );
};

export default Tetris;
