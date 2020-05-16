import {
  SET_ERROR,
  SET_DARKMODE,
  SET_GAME_STATUS,
  SET_READY,
  JOIN_ROOM,
  CHECK_ROOM_USER,
  SEND_SHADOW,
  SET_USERS,
  SET_SHADOW, INIT_USER,
} from './types';

/**
 *    Redux setters
 */

export const setError = (payload) => ({ type: SET_ERROR, payload });
export const setDarkmode = () => ({ type: SET_DARKMODE });
export const setGameStatus = (payload) => ({ type: SET_GAME_STATUS, payload });
export const setReady = (payload) => ({ type: SET_READY, payload });
export const setUsers = (payload) => ({ type: SET_USERS, payload });
export const setShadow = (payload) => ({ type: SET_SHADOW, payload });
export const initUser = (payload) => ({ type: INIT_USER, payload });

export const joinRoom = (payload) => ({ type: JOIN_ROOM, payload });
/**
 *    Action creators
 *    (dispatch provided by redux-thunk)
 */

export const joinRoomSocket = (data) => (dispatch) => {
  if (!data.username.match('^[a-zA-Z]{3,}$') || !data.roomName.match('^[a-zA-Z]{3,}$')) {
    dispatch(setError('Inputs must be at least 3 length, can contain only cap/min letters.'));
  } else {
    dispatch({ type: JOIN_ROOM, data });
  }
};

export const checkRoomSocket = (history, data, cb) => (dispatch) => {
  dispatch({
    type: CHECK_ROOM_USER, history, data, cb,
  });
};

export const sendShadowSocket = (data) => (dispatch) => {
  dispatch({ type: SEND_SHADOW, data });
};
