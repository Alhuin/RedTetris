import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  sendShadowSocket,
  setGameStatus,
} from '../redux/actions';
import { GRID_WIDTH, initGrid } from '../components/Tetris/helpers';
import { SET_SHADOW } from '../redux/actions/types';
import { selectShadow, selectSocket } from '../redux/selectors';

export const useGrid = (player, resetPlayer, nbPlayers, setDropTime) => {
  const dispatch = useDispatch();
  const [linesCleared, setLinesCleared] = useState(0);
  const [grid, setGrid] = useState(initGrid());
  const socket = useSelector(selectSocket);
  const opponentShadow = useSelector(selectShadow);

  const startGame = () => {
    // reset grid, player, gameStatus & dropTime
    if (nbPlayers > 1) {
      dispatch({ type: SET_SHADOW, payload: [] });
    }
    dispatch(setGameStatus(1));
    setDropTime((0.8 - ((0) * 0.007)) ** (0) * 1000);
    setGrid(initGrid());
    resetPlayer();
  };

  // builds a fresh grid from the stored one (with merged tetriminos) and draws the current piece
  useEffect(() => {
    setLinesCleared(0);

    const buildShadow = (clearedGrid) => {
      const shadow = [];
      for (let i = 0; i < GRID_WIDTH; i += 1) {
        shadow.push(
          clearedGrid.map((line) => line[i])
            .findIndex((cell) => cell[0] !== 0),
        );
      }
      return shadow;
    };

    const removeClearedLines = (newGrid) => newGrid
      .reduce((ack, line) => {
        if (line.findIndex((cell) => cell[0] === 0) === -1) { // if we find a line with no 0 (full)
          // dispatch(incrementLinesCleared()); // increment linesCleared number
          setLinesCleared((prev) => prev + 1);
          // add a new empty line a the top of the grid
          ack.unshift(new Array(newGrid[0].length).fill([0, 'clear', 0]));
          return ack;
        }
        ack.push(line);
        return ack;
      }, []);

    const updateGrid = (prevGrid) => {
      // clear grid & keep merged pieces only
      const newGrid = prevGrid.map((line) => line.map((cell) => (cell[1] === 'clear'
        ? [0, 'clear', 0] // if cell is not merged don't keep it in new grid
        : [cell[0], cell[1], 0])));

      if (nbPlayers > 1) {
        opponentShadow.forEach((first, index) => {
          if (first >= 0) {
            newGrid[first][index][2] = 1;
          }
        });
      }
      // draw tetrimino on the fresh grid
      // console.table(player.tetrimino);
      player.tetrimino.forEach((line, y) => {
        line.forEach((value, x) => {
          if (value !== 0) { // not an empty cell
            newGrid[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`, // merge tetrimino if we collided
              0,
            ];
          }
        });
      });

      // check if we collided
      if (player.collided) {
        resetPlayer();
        const clearedGrid = removeClearedLines(newGrid);
        if (nbPlayers > 1) {
          dispatch(sendShadowSocket({
            shadow: buildShadow(clearedGrid),
          }));
        }
        return clearedGrid;
      }
      return newGrid;
    };

    // set new grid
    setGrid(updateGrid(grid));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetrimino,
    resetPlayer,
    opponentShadow,
  ]);

  useEffect(() => {
    socket.on('start', () => {
      console.log('start recieved');
      startGame();
    });
    socket.on(SET_SHADOW, (shadow) => {
      console.log('recieved updateShadow');
      dispatch({ type: SET_SHADOW, payload: shadow });
    });
  }, []);

  return [grid, linesCleared];
};
