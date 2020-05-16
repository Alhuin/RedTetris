import {
  JOIN_ROOM,
  CHECK_ROOM_USER,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,
  SEND_SHADOW,
  SET_SHADOW,
} from '../redux/actions/types';
import {
  initUser,
  setError,
  setReady,
  setShadow,
  setUsers,
} from '../redux/actions';

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
      socket.emit(JOIN_ROOM, action.data, () => {
        dispatch(initUser({
          username: action.data.username,
          roomName: action.data.roomName,
        }));
      });

      socket.on(JOIN_ROOM_SUCCESS, (data) => {
        dispatch(setUsers(data.users));
      });

      socket.on(JOIN_ROOM_ERROR, (errorMsg) => {
        dispatch(setError(errorMsg));
      });
      break;
    case CHECK_ROOM_USER:
      console.log('middleware checkRoomUser');
      socket.emit(CHECK_ROOM_USER, action.data.roomName, action.data.username, (res) => {
        if (!res.status) {
          action.history.push('/');
          // prevents setstate in Tetris render
        }
        dispatch(setReady(res.status));
        // dispatch({ type: SET_READY, payload: res.status });
        action.cb(res.status);
      });
      break;
    case SEND_SHADOW:
      console.log('middleware sendShadow');
      socket.emit(SEND_SHADOW, state.roomName, state.username, action.data);
      break;
    case SET_SHADOW:
      dispatch(setShadow(action.data.shadow));
      // dispatch({ type: SET_SHADOW, payload: action.data.shadow });
      break;
    case 'START_GAME':
      socket.emit('startGame');
      break;
    default:
      console.log('the next action:', action);
      return next(action);
  }
};

export default socketMiddleware;
