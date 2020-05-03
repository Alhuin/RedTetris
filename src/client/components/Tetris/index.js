/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { checkRoomAvailable, initGrid, checkCollision } from './helpers';
import { selectSocket } from '../../redux/selectors';

// Custom Hooks
import { useGrid } from '../../hooks/useGrid';
import { usePlayer } from '../../hooks/usePlayer';
import { useInterval } from '../../hooks/useInterval';
import { useGameStatus } from '../../hooks/useGameStatus';

// Components
import Grid from './Grid';
import Card from './Card';
// import Lobby from './Lobby';
import StartButton from './StartButtton';
import { StyledTetris, StyledTetrisWrapper } from '../styles/StyledTetris';


const Tetris = ({ match, location, history }) => {
  const socket = useSelector(selectSocket);

  const [dropTime, setDropTime] = useState(null);
  // const [users, setUsers] = useState([{}]);
  const [checked, setChecked] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const isMounted = useRef(true);

  const [player, updatePlayerPos, resetPlayer, rotateIfPossible] = usePlayer();
  const [grid, setGrid, linesCleared] = useGrid(player, resetPlayer);
  const [score, setScore, level, setLevel, lines, setLines] = useGameStatus(linesCleared);
  const { roomName, username } = match.params;
  let ready;

  if (location && location.state) {
    ready = location.state.ready;
  }
  // console.log(`re-render, checked = ${checked}, ready = ${ready}`);
  // useEffect(() => {
  //   socket.on('userReady', setUsers);
  // }, []);

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
    // reset grid, player, gameOver & dropTime
    setGameStarted(true);
    setGrid(initGrid());
    setDropTime(800);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLines(0);
    setLevel(0);
  };

  const drop = () => {
    if (lines >= (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime((prev) => prev * 0.5);
    }
    if (!checkCollision(player, grid, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setGameStarted(false);
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
      } else if (keyCode === 32) {
        console.log('space');
      }
    }
  };

  useEffect(() => {
    const eventListner = (e) => move(e);

    window.addEventListener(
      'keydown',
      eventListner,
      false,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        eventListner,
        false,
      );
    };
  });

  useInterval(() => {
    drop();
  }, dropTime);

  if (checked === null) {
    return <></>;
  }
  if (checked === false) {
    history.push('/');
    // return <Redirect to="/" />;
  }

  return (
    <StyledTetrisWrapper role="buttton">
      { checked
        && (
          <StyledTetris>
            <Grid grid={grid} />
            <aside>
              {gameOver
                ? <Card gameOver={gameOver} text={`Game Over: ${score} points`} />
                : (
                  <div>
                    <Card text={`Score: ${score}`} />
                    <Card text={`Lines: ${lines}`} />
                    <Card text={`Level: ${level + 1}`} />
                    {/* <Lobby users={users} /> */}
                  </div>
                )}
              <StartButton
                mode=""
                disabled={gameStarted}
                cb={() => {
                  startGame();
                }}
              />
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
