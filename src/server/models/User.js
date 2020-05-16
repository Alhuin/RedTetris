import { v4 as uuidv4 } from 'uuid';

const init = (socket) => ({
  id: uuidv4().toString(),
  name: '',
  socket,
  room: '',
  isAdmin: false,
  pieceIndex: 0,
  pieceState: 0,
  shadow: [],
});

export default {
  init,
};
