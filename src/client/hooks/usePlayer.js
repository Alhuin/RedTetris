import { useCallback, useState } from 'react';

import { randomTetrimino, TETRIMINOS } from '../components/Tetris/tetriminos';
import { checkCollision, GRID_WIDTH } from '../components/Tetris/helpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: GRID_WIDTH / 2 - 2, y: 0 },
    tetrimino: TETRIMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, direction) => {
    const rotatedTetrimino = matrix.map((_, index) => matrix.map((col) => col[index]));
    return direction > 0
      ? rotatedTetrimino.map((line) => line.reverse())
      : rotatedTetrimino.reverse();
  };

  const rotateIfPossible = (grid, direction) => {
    const playerCopy = JSON.parse(JSON.stringify(player));
    const tmpX = playerCopy.pos.x;
    let offset = 1;

    playerCopy.tetrimino = rotate(playerCopy.tetrimino, direction);

    while (checkCollision(playerCopy, grid, { x: 0, y: 0 })) {
      playerCopy.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : 0));
      if (offset > playerCopy.tetrimino[0].length) { // rotation impossible
        rotate(playerCopy.tetrimino, -direction); // rotate -dir pour retrouver la pos initiale
        playerCopy.x = tmpX;
        return;
      }
    }
    setPlayer(playerCopy);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer({ // ({}) necessary to spread prev
      ...player,
      pos: {
        x: player.pos.x += x,
        y: player.pos.y += y,
      },
      collided,
    });
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: {
        x: GRID_WIDTH / 2 - 2, // horizontally center
        y: 0,
      },
      tetrimino: randomTetrimino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, rotateIfPossible];
};
