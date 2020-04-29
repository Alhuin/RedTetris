import {
  SET_USERNAME,
  SET_SOCKET,
  ROOM_JOINED,
  SET_ADMIN,
  SET_ROOM_STATE,
} from './actions/types';

const initialState = {
  username: '',
  socket: null,
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
    case ROOM_JOINED:
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
    default:
      return state;
  }
};

// Catch logOut action to reinitialise state
const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === 'LOG_OUT') {
    newState = undefined;
  }
  return authReducer(newState, action);
};

export default rootReducer;
