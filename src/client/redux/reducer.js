import socketio from 'socket.io-client';

import {
  SET_USERNAME,
  SET_SOCKET,
  SET_ROOM,
  SET_ADMIN,
  SET_ROOM_STATE, INIT_GAME,
} from './actions/types';

const socket = socketio('127.0.0.1:4001');
const buffer = new ArrayBuffer(32);

const initialState = {
  username: '',
  socket,
  currentRoom: null,
  isAdmin: false,
  roomState: 0, // 0: Login, 1: Ready, 2: Playing
  pieces: [],
  cleanBoard: buffer,
};

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state, socket: action.payload,
      };
    case SET_USERNAME:
      return {
        ...state, username: action.payload,
      };
    case SET_ROOM:
      return {
        ...state, currentRoom: action.payload,
      };
    case SET_ADMIN:
      return {
        ...state, isAdmin: action.payload,
      };
    case SET_ROOM_STATE:
      return {
        ...state, roomState: action.payload,
      };
    case INIT_GAME:
      return {
        ...state, currentRoom: action.payload, roomState: 2,
      };
    case 'SET_PIECES':
      return {
        ...state, pieces: action.payload,
      };
    case 'SET_CLEAN_BOARD':
      return {
        ...state, cleanBoard: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
