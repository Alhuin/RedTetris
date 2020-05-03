import { useEffect, useState } from 'react';
import { initGrid } from '../components/Tetris/helpers';

export const useGrid = (player, resetPlayer) => {
  const [grid, setGrid] = useState(initGrid());

  // builds a fresh grid from the stored one (with merged tetriminos) and draws the current piece
  useEffect(() => {
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
      return newGrid;
    };

    // check if we collided
    if (player.collided) {
      resetPlayer();
    }
    // set new grid
    setGrid((prev) => updateGrid(prev));
  }, [player, resetPlayer]);

  return [grid, setGrid];
};
