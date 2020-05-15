import socketio from 'socket.io-client';
import {
  SET_DROP_TIME,
  SET_PLAYER,
  SET_GRID,
  SET_LINES_CLEARED,
  SET_LINES,
  SET_SCORE,
  SET_LEVEL,
  INCREMENT_LINES_CLEARED,
  SET_GAME_STATUS,
  SET_ERROR,
  SET_READY,
  SET_CHECKED,
  INIT_USER,
  RESET_PLAYER, SET_SHADOW,
} from './actions/types';
import { serverUrl } from '../config';
import { TETRIMINOS } from '../components/Tetris/tetriminos';
import { GRID_WIDTH, initGrid } from '../components/Tetris/helpers';

console.log(serverUrl);
const socket = socketio(serverUrl);

const initialState = {
  socket,
  username: '',
  roomName: '',
  error: '',
  gameStatus: 0,
  me: {
    pos: { x: GRID_WIDTH / 2 - 2, y: 0 },
    tetrimino: TETRIMINOS[0].shape,
    collided: false,
  },
  shadow: [],
  room: null,
  dropTime: null,
  grid: initGrid(),
  linesCleared: 0,
  lines: 0,
  score: 0,
  level: 0,
  checked: null,
  ready: false,
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     *    Authentication actions
     */

    case SET_CHECKED:
      return {
        ...state,
        checked: action.payload,
      };
    case SET_READY:
      return {
        ...state,
        ready: action.payload,
      };
    case INIT_USER: {
      return {
        ...state,
        username: action.payload.username,
        roomName: action.payload.roomName,
        ready: true,
      };
    }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload.users,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

      /**
       *    Game actions
       */

    case SET_PLAYER: {
      if (action.player === state.username) {
        return { ...state, me: action.data };
      }
      return { ...state, opponent: action.data };
    }
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
    case SET_DROP_TIME:
      return {
        ...state,
        dropTime: action.payload,
      };
    case SET_GRID:
      return {
        ...state,
        grid: action.payload,
      };
    case SET_LINES_CLEARED:
      return {
        ...state,
        linesCleared: action.payload,
      };
    case SET_LINES:
      return {
        ...state,
        lines: action.payload,
      };
    case SET_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case SET_LEVEL:
      return {
        ...state,
        level: action.payload,
      };
    case INCREMENT_LINES_CLEARED: {
      let { linesCleared } = state;

      linesCleared += 1;
      return {
        ...state,
        linesCleared,
      };
    }
    case RESET_PLAYER:
      return {
        ...initialState,
        socket,
        username: state.username,
        roomName: state.roomName,
      };
    default:
      return state;
  }
};

export default reducer;
