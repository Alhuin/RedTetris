export const checkParams = (roomName, username, setError) => {
  if (roomName === '' || username === '') {
    setError('Fields can\'t be blank');
    return false;
  }
  return true;
};

export const checkRoomAvailable = (socket, roomName, username, setError, setReady) => socket
  .emit('isRoomAvailable', roomName, (data) => {
    if (data.status === true) {
      socket.emit(data.needCreate ? 'createRoom' : 'joinRoom', roomName, username, () => {
        setReady(true);
      });
    } else {
      setError(data.error);
    }
  });
