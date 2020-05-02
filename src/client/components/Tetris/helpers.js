export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const initStage = () => Array.from(
  Array(STAGE_HEIGHT),
  () => Array.from(Array(STAGE_WIDTH)).fill([0, 'clear']),
);

export const checkParams = (roomName, username, setError) => {
  if (roomName === '' || username === '') {
    setError('Fields can\'t be blank');
    return false;
  }
  return true;
};

export const checkRoomAvailable = (socket, roomName, username, cb) => socket.emit('isRoomAvailable', roomName, (data) => {
  if (data.status === true) {
    console.log('room available, needCreate ? ', data.needCreate);
    socket.emit(data.needCreate ? 'createRoom' : 'joinRoom', roomName, username, () => {
      console.log('createe or join room');
      cb();
    });
  } else {
    console.log(data.error);
    cb();
  }
});
