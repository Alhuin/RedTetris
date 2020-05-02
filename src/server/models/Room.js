import uuid from 'uuid';
import { pieces } from '../constants/index.js';

const init = (roomName) => ({
  id: uuid.v4().toString(),
  name: roomName,
  users: [],
  launched: false,
  pieces: [pieces[0], pieces[0], pieces[0]],
});

export default {
  init,
};
