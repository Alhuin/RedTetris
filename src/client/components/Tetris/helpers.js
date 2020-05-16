export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const initGrid = () => Array.from(
  Array(GRID_HEIGHT),
  () => Array.from(Array(GRID_WIDTH)).fill([0, 'clear', 0]),

  // Cell pattern
  //  [
  //    <0 / letter>,                 0: empty; letter: tetrimino letter;
  //    <'clear' / 'merged'>,         'clear': do not redraw cell next render; 'merged': do redraw;
  //    <0 / 1>,                      1: opponent shadow on this cell; 0: no opponent shadow;
  //  ]
);

export const checkParams = (roomName, username, setError, dispatch) => {
  if (!username.match('^[a-zA-Z]{3,}$') || !roomName.match('^[a-zA-Z]{3,}$')) {
    dispatch(setError('Inputs must be at least 3 length, can contain only letters.'));
    return false;
  }
  return true;
};

export const checkCollision = (player, grid, { x: moveX, y: moveY }) => {
  const { tetrimino } = player;
  const tetriHeight = tetrimino.length;
  const tetriWidth = tetrimino[0].length;

  for (let y = 0; y < tetriHeight; y += 1) {
    for (let x = 0; x < tetriWidth; x += 1) {
      if (tetrimino[y][x] !== 0) { // if tetrimino cell is not empty, check the intended position
        // intended x = tetrimino.x + player.x + intended move on x
        const aimedX = x + player.pos.x + moveX;
        // intended y = tetrimino.y + player.y + intended move on y
        const aimedY = y + player.pos.y + moveY;

        if (!grid[aimedY] // we went out of the grid vertically
          || !grid[aimedY][aimedX] // we went out of the grid horizontally
          || grid[aimedY][aimedX][1] !== 'clear') { // we hit another tetrimino
          return true;
        }
      }
    }
  }
  return false;
};
