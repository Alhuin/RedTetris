import {
  SET_DROP_TIME,
  SET_ERROR,
  SET_GAME_STATUS,
  SET_LINES_CLEARED,
  SET_LINES,
  SET_SCORE,
  SET_LEVEL,
  INCREMENT_LINES_CLEARED,
  SET_CHECKED,
  SET_READY,
  JOIN_ROOM,
  CHECK_ROOM_USER,
} from './types';

export const setError = (payload) => ({ type: SET_ERROR, payload });

export const joinRoomSocket = (data) => (dispatch) => {
  if (data.username === '' || data.roomName === '') {
    dispatch(setError('Fields can\'t be blank !'));
  } else {
    dispatch({ type: JOIN_ROOM, data });
    // socket.emit(JOIN_ROOM, data);
    // cb catched by JOIN_ROOM_SUCCESS / JOIN_ROOM_ERROR in Login.js & Tetris.js
  }
};

export const checkRoomSocket = (history, data) => (dispatch) => {
  dispatch({ type: CHECK_ROOM_USER, history, data });
};

export function setGameStatus(payload, dispatch) {
  dispatch({ type: SET_GAME_STATUS, payload });
}

export function setDropTime(payload, dispatch) {
  dispatch({ type: SET_DROP_TIME, payload });
}

export function setReady(payload, dispatch) {
  dispatch({ type: 'SET_READY', payload });
}

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
