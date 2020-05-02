export const checkParams = (roomName, username, setError) => {
  if (roomName === '' || username === '') {
    console.log('false');
    setError('Fields can\'t be blank');
    return false;
  }
  return true;
};

export const checkRoomAvailable = (socket, roomName, username, setError, setReady) => socket.emit('isRoomAvailable', roomName, (data) => {
  if (data.status === true) {
    console.log('room available, needCreate ? ', data.needCreate);
    socket.emit(data.needCreate ? 'createRoom' : 'joinRoom', roomName, username, () => {
      console.log('setready');
      setReady(true);
    });
  } else {
    setError(data.error);
  }
});
