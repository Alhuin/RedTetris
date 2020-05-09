/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Redux
import {
  initGrid, checkCollision, checkParams,
} from './helpers';
import {
  selectChecked,
  selectDropTime,
  selectGameStatus,
  selectUsers,
} from '../../redux/selectors';
import {
  setDropTime,
  setGameStatus,
  setError,
  joinRoomSocket,
  checkRoomSocket,
} from '../../redux/actions';

// Custom Hooks
import { useGrid } from '../../hooks/useGrid';
import { usePlayer } from '../../hooks/usePlayer';
import { useInterval } from '../../hooks/useInterval';
import { useGameStatus } from '../../hooks/useGameStatus';

// Components
import Grid from './Grid';
import Card from './Card';
import Lobby from './Lobby';
import StartButton from './StartButtton';
import { StyledTetris, StyledTetrisWrapper } from '../styles/StyledTetris';

const Tetris = ({ location, match, history }) => {
  const dispatch = useDispatch();
  const dropTime = useSelector(selectDropTime);
  const gameStatus = useSelector(selectGameStatus);
  const checked = useSelector(selectChecked);
  const users = useSelector(selectUsers);
  const isMounted = useRef(true);

  const { roomName, username } = match.params;
  const [player, updatePlayerPos, resetPlayer, rotateIfPossible] = usePlayer(username);
  const [grid, setGrid, linesCleared] = useGrid(player, resetPlayer);
  const [score, level, setLevel, lines] = useGameStatus(linesCleared);
  let ready;

  if (location && location.state) {
    ready = location.state.ready;
  }

  // useEffect(() => {
  // todo leave room, change username
  // }, [roomName, username]);

  useEffect(() => {
    if (isMounted.current) {
      if (ready === undefined) {
        // if connected from url, check parameters & joinRoom
        if (checkParams(roomName, username, setError, dispatch)) {
          dispatch(joinRoomSocket({
            roomName,
            username,
          }));
        }
      }
      // check if user is allowed to access this room
      dispatch(checkRoomSocket(history, {
        roomName,
        username,
      }));
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
    // reset grid, player, gameStatus & dropTime
    setGameStatus(1, dispatch);
    resetPlayer();
    setDropTime(800, dispatch);
    dispatch(setGrid(initGrid()));
  };

  const drop = () => {
    if (lines >= (level + 1) * 10) {
      setLevel(level + 1, dispatch);
      setDropTime(dropTime * 0.5, dispatch);
    }
    if (!checkCollision(player, grid, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameStatus(3, dispatch);
        setDropTime(null, dispatch);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    // console.log(gameStatus);
    if (gameStatus === 1) { // if playing
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        rotateIfPossible(grid, 1);
      } else if (keyCode === 32) { // todo hard drop
        console.log('space');
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  if (checked === null) {
    // waiting for redux, room not yet checked
    return <></>;
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={move}>
      { checked
      && (
        <StyledTetris>
          <Grid grid={grid} />
          <aside>
            {gameStatus === 3
              ? <Card gameOver={gameStatus === 3} text={`Game Over: ${score} points`} />
              : (
                <div>
                  <Card text={`Score: ${score}`} />
                  <Card text={`Lines: ${lines}`} />
                  <Card text={`Level: ${level + 1}`} />
                  <Lobby users={users} />
                </div>
              )}
            <StartButton
              mode=""
              disabled={gameStatus === 2} // while playing
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
