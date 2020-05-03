/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { checkRoomAvailable, initGrid, checkCollision } from './helpers';
import { selectSocket } from '../../redux/selectors';

// Custom Hooks
import { useGrid } from '../../hooks/useGrid';
import { usePlayer } from '../../hooks/usePlayer';

// Components
import Grid from './Grid';
import Card from './Card';
import Lobby from './Lobby';
import StartButton from './StartButtton';
import { StyledTetris, StyledTetrisWrapper } from '../styles/StyledTetris';


const Tetris = ({ match, location, history }) => {
  const socket = useSelector(selectSocket);

  const [dropTime, setDropTime] = useState(null);
  const [users, setUsers] = useState([{}]);
  const [checked, setChecked] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const isMounted = useRef(true);

  const [player, updatePlayerPos, resetPlayer, rotateIfPossible] = usePlayer();
  const [grid, setGrid] = useGrid(player, resetPlayer);
  const { roomName, username } = match.params;
  let ready;

  if (location && location.state) {
    ready = location.state.ready;
  }
  console.log(`re-render, checked = ${checked}, ready = ${ready}`);

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

  const movePlayer = (direction) => {
    if (!checkCollision(player, grid, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setGrid(initGrid());
    resetPlayer();
    setGameOver(false);
    // reset everything
  };

  const drop = () => {
    if (!checkCollision(player, grid, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log('game over');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        rotateIfPossible(grid, 1);
      }
    }
  };

  if (checked === null) {
    return <></>;
  }
  if (checked === false) {
    history.push('/');
    // return <Redirect to="/" />;
  }
  return (
    <StyledTetrisWrapper role="buttton" tabIndex="0" onKeyDown={move}>
      { checked
        && (
          <StyledTetris>
            <Grid grid={grid} />
            <aside>
              {gameOver
                ? <Card gameOver={gameOver} text="Game Over" />
                : (
                  <div>
                    <Card text="Score" />
                    <Card text="Rows" />
                    <Card text="Level" />
                    <Lobby users={users} />
                  </div>
                )}
              <StartButton mode="Solo" cb={startGame} />
            </aside>
          </StyledTetris>
        )}
    </StyledTetrisWrapper>
  );
};

Tetris.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Tetris;
