import socketio from 'socket.io-client';
import {
  SET_GAME_STATUS,
  SET_ERROR,
  SET_READY,
  INIT_USER,
  SET_SHADOW,
  SET_USERS,
} from './actions/types';
import { serverUrl } from '../config';

console.log(serverUrl);
console.log(process.env.NODE_ENV);
const socket = socketio(process.env.NODE_ENV === 'production'
  ? serverUrl
  : 'http://localhost:4001');

const initialState = {
  socket,
  username: '',
  roomName: '',
  error: '',
  gameStatus: 0,
  shadow: [],
  ready: false,
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     *    Authentication actions
     */

    case SET_READY:
      return {
        ...state,
        ready: action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case INIT_USER: {
      return {
        ...state,
        username: action.payload.username,
        roomName: action.payload.roomName,
        ready: true,
      };
    }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

      /**
       *    Game actions
       */

    case SET_SHADOW:
      return {
        ...state,
        shadow: action.payload,
      };
    case SET_GAME_STATUS:
      return {
        ...state,
        gameStatus: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
