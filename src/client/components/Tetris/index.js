/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { initStage, checkRoomAvailable } from './helpers';
import Stage from './Stage';
import Display from './Display';
import Lobby from './Lobby';
import StartButton from './StartButtton';
import { StyledTetris, StyledTetrisWrapper } from '../styles/StyledTetris';
import { selectSocket } from '../../redux/selectors';

const Tetris = ({ match, location, history }) => {
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
    history.push('/');
    // return <Redirect to="/" />;
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

Tetris.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Tetris;
