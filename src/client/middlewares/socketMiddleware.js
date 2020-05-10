import {
  JOIN_ROOM, SET_CHECKED, SET_READY, CHECK_ROOM_USER, JOIN_ROOM_SUCCESS, JOIN_ROOM_ERROR, SET_ERROR,
} from '../redux/actions/types';

// The socket middleware handles redux and socketIo dispatching
// If one of those actions are catched, they are handled here
// Otherwise they are passed as standard actions to redux (like setters, see redux/actions/index.js)
const socketMiddleware = (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  const state = getState();
  const { socket } = state;

  switch (action.type) {
    case JOIN_ROOM:
      console.log('middleware JOIN_ROOM');
      socket.emit(JOIN_ROOM, action.data);

      socket.on(JOIN_ROOM_SUCCESS, (data) => {
        dispatch({ // Init username & roomName and return room usersList
          type: 'INIT_USER',
          payload: {
            username: data.username,
            roomName: data.roomName,
            users: data.users,
          },
        });
      });

      socket.on(JOIN_ROOM_ERROR, (errorMsg) => {
        dispatch({ type: SET_ERROR, payload: errorMsg });
      });
      break;
    case CHECK_ROOM_USER:
      console.log('middleware checkRoomUser');
      socket.emit(CHECK_ROOM_USER, action.data.roomName, action.data.username, (res) => {
        if (!res.status) {
          action.history.push('/');
          // prevents setstate in Tetris render
        }
        dispatch({ type: SET_CHECKED, payload: res.status });
        dispatch({ type: SET_READY, payload: res.status });
      });
      break;
    default:
      console.log('the next action:', action);
      return next(action);
  }
};

export default socketMiddleware;
