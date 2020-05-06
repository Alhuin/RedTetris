export const checkParams = (roomName, username, setError, dispatch) => {
  if (roomName === '' || username === '') {
    setError('Fields can\'t be blank', dispatch);
    return false;
  }
  return true;
};

export const checkRoomAvailable = (socket, roomName, username, setError, setReady, dispatch) => socket
  .emit('isRoomAvailable', roomName, (data) => {
    if (data.status === true) {
      socket.emit(data.needCreate ? 'createRoom' : 'joinRoom', roomName, username, () => {
        setReady(true);
      });
    } else {
      setError(data.error, dispatch);
    }
  });
