import socketio from 'socket.io-client';

import {
  SET_USERNAME,
  SET_SOCKET,
  SET_ROOM,
  SET_ADMIN,
  SET_ROOM_STATE, INIT_GAME,
} from './actions/types';

const socket = socketio('127.0.0.1:4001');
const initialState = {
  username: '',
  socket,
  currentRoom: null,
  isAdmin: false,
  roomState: 0, // 0: Login, 1: Ready, 2: Playing
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
    default:
      return state;
  }
};

export default authReducer;
