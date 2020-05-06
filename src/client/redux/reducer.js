import socketio from 'socket.io-client';
import {
  SET_ROOM_NAME,
  SET_DROP_TIME,
  SET_USERNAME,
  SET_PLAYER,
  SET_GRID,
  SET_LINES_CLEARED,
  SET_LINES,
  SET_SCORE,
  SET_LEVEL,
  INCREMENT_LINES_CLEARED,
  SET_GAME_STATUS,
  SET_ERROR,
} from './actions/types';
import { TETRIMINOS } from '../components/Tetris/tetriminos';
import { GRID_WIDTH, initGrid } from '../components/Tetris/helpers';

const socket = socketio('https://daf8d1c1.ngrok.io');
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
  opponent: {
    pos: { x: GRID_WIDTH / 2 - 2, y: 0 },
    tetrimino: TETRIMINOS[0].shape,
  },
  room: null,
  dropTime: null,
  grid: initGrid(),
  linesCleared: 0,
  lines: 0,
  score: 0,
  level: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER: {
      if (action.player === state.username) {
        return { ...state, me: action.data };
      }
      return { ...state, opponent: action.data };
    }
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SET_ROOM_NAME:
      return {
        ...state,
        roomName: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
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
    case 'RESET_PLAYER':
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
