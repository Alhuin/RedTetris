export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const initGrid = () => Array.from(
  Array(GRID_HEIGHT),
  () => Array.from(Array(GRID_WIDTH)).fill([0, 'clear']),
);

export const checkParams = (roomName, username, setError, dispatch) => {
  if (roomName === '' || username === '') {
    setError('Fields can\'t be blank', dispatch);
    return false;
  }
  return true;
};

export const checkRoomAvailable = (socket, roomName, username, setError, dispatch, cb) => socket.emit('isRoomAvailable', roomName, (data) => {
  if (data.status === true) {
    socket.emit(data.needCreate ? 'createRoom' : 'joinRoom', roomName, username, () => {
      cb();
    });
  } else {
    setError(data.error, dispatch);
    cb();
  }
});


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
