import { v4 as uuidv4 } from 'uuid';

const init = (roomName) => ({
  id: uuidv4().toString(),
  name: roomName,
  users: [],
  launched: false,
});

export default {
  init,
};
