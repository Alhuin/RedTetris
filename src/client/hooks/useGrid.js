import { useEffect, useState } from 'react';
import { initGrid } from '../components/Tetris/helpers';

export const useGrid = (player, resetPlayer) => {
  const [grid, setGrid] = useState(initGrid());
  const [linesCleared, setLinesCleared] = useState(0);

  // builds a fresh grid from the stored one (with merged tetriminos) and draws the current piece
  useEffect(() => {
    setLinesCleared(0);

    const removeClearedLines = (newGrid) => newGrid
      .reduce((ack, line) => {
        if (line.findIndex((cell) => cell[0] === 0) === -1) { // if we find a line with no 0 (full)
          setLinesCleared((prev) => prev + 1); // increment linesCleared number
          // add a new empty line a the top of the grid
          ack.unshift(new Array(newGrid[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(line);
        return ack;
      }, []);

    const updateGrid = (prevGrid) => {
      // clear grid & keep merged pieces only
      const newGrid = prevGrid.map((line) => line.map((cell) => (cell[1] === 'clear'
        ? [0, 'clear'] // if cell is not merged don't keep it in new grid
        : cell)));

      // draw tetrimino on the fresh grid
      player.tetrimino.forEach((line, y) => {
        line.forEach((value, x) => {
          if (value !== 0) { // not an empty cell
            newGrid[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`, // merge tetrimino if we collided
            ];
          }
        });
      });

      // check if we collided
      if (player.collided) {
        resetPlayer();
        return removeClearedLines(newGrid);
      }
      return newGrid;
    };

    // set new grid
    setGrid((prev) => updateGrid(prev));
  }, [player, resetPlayer]);

  return [grid, setGrid, linesCleared];
};
