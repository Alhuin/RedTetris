import {
  SET_USERNAME,
  SET_ROOM_NAME,
  SET_PLAYER,
  SET_DROP_TIME,
  SET_GRID,
  SET_ERROR,
  SET_GAME_STATUS,
  SET_LINES_CLEARED,
  SET_LINES,
  SET_SCORE,
  SET_LEVEL,
  INCREMENT_LINES_CLEARED,
} from './types';

export function setUsername(payload, dispatch) {
  dispatch({ type: SET_USERNAME, payload });
}

export function setRoomName(payload, dispatch) {
  dispatch({ type: SET_ROOM_NAME, payload });
}

export function setPlayer(payload, dispatch) {
  dispatch({ type: SET_PLAYER, payload });
}

export function setError(payload, dispatch) {
  dispatch({ type: SET_ERROR, payload });
}

export function setGameStatus(payload, dispatch) {
  dispatch({ type: SET_GAME_STATUS, payload });
}

export function setDropTime(payload, dispatch) {
  dispatch({ type: SET_DROP_TIME, payload });
}
//
// export function setGrid(payload) {
//   console.log('todo: send grid to server, dispatch at callback');
//   return ({ type: SET_GRID, payload });
// }

export function setLinesCleared(payload, dispatch) {
  dispatch({ type: SET_LINES_CLEARED, payload });
}

export function incrementLinesCleared(dispatch) {
  dispatch({ type: INCREMENT_LINES_CLEARED });
}

export function setLines(payload, dispatch) {
  dispatch({ type: SET_LINES, payload });
}

export function setScore(payload, dispatch) {
  dispatch({ type: SET_SCORE, payload });
}

export function setLevel(payload, dispatch) {
  dispatch({ type: SET_LEVEL, payload });
}
