import {
  SET_DROP_TIME,
  SET_ERROR,
  SET_DARKMODE,
  SET_GAME_STATUS,
  SET_LINES_CLEARED,
  SET_LINES,
  SET_SCORE,
  SET_LEVEL,
  SET_READY,
  INCREMENT_LINES_CLEARED,
  JOIN_ROOM,
  CHECK_ROOM_USER,
} from './types';

/**
 *    Redux setters
 */

export const setError = (payload) => ({ type: SET_ERROR, payload });
export const setDarkmode = () => ({ type: SET_DARKMODE });
export const setGameStatus = (payload) => ({ type: SET_GAME_STATUS, payload });
export const setDropTime = (payload) => ({ type: SET_DROP_TIME, payload });
export const setReady = (payload) => ({ type: SET_READY, payload });
export const setLinesCleared = (payload) => ({ type: SET_LINES_CLEARED, payload });
export const setLines = (payload) => ({ type: SET_LINES, payload });
export const setScore = (payload) => ({ type: SET_SCORE, payload });
export const setLevel = (payload) => ({ type: SET_LEVEL, payload });
// in a loop, can't wait for redux updates
export const incrementLinesCleared = () => ({ type: INCREMENT_LINES_CLEARED });


/**
 *    Action creators
 *    (dispatch provided by redux-thunk)
 */

export const joinRoomSocket = (data) => (dispatch) => {
  if (data.username === '' || data.roomName === '') {
    dispatch(setError('Fields can\'t be blank !'));
  } else {
    dispatch({ type: JOIN_ROOM, data });
  }
};

export const checkRoomSocket = (history, data) => (dispatch) => {
  dispatch({ type: CHECK_ROOM_USER, history, data });
};
