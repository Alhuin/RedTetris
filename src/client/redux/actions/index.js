import {
  SET_ERROR,
  SET_GAME_STATUS,
  SET_READY,
  JOIN_ROOM,
  CHECK_ROOM_USER,
  SEND_SHADOW,
} from './types';

/**
 *    Redux setters
 */

export const setError = (payload) => ({ type: SET_ERROR, payload });
export const setGameStatus = (payload) => ({ type: SET_GAME_STATUS, payload });
export const setReady = (payload) => ({ type: SET_READY, payload });

/**
 *    Action creators
 *    (dispatch provided by redux-thunk)
 */

export const joinRoomSocket = (data, cb) => (dispatch) => {
  if (data.username === '' || data.roomName === '') {
    dispatch(setError('Fields can\'t be blank !'));
  } else {
    dispatch({ type: JOIN_ROOM, data, cb });
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
