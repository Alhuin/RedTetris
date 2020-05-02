import { v4 as uuidv4 } from 'uuid';

const init = (socket) => ({
  id: uuidv4().toString(),
  name: '',
  socket,
  room: '',
  isAdmin: false,
  me: { x: 4, y: 0 },
  pieceIndex: 0,
  pieceState: 0,
});

export default {
  init,
};
