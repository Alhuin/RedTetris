import {
  SET_USERNAME,
  SET_SOCKET,
  SET_ADMIN,
  SET_ROOM_STATE,
  INIT_GAME,
} from './types';

export function setUsername(payload) {
  return ({ type: SET_USERNAME, payload });
}

export function setSocket(payload) {
  return ({ type: SET_SOCKET, payload });
}

export function setAdmin(payload) {
  return ({ type: SET_ADMIN, payload });
}

export function setRoomState(payload) {
  return ({ type: SET_ROOM_STATE, payload });
}

export function initGame(payload) {
  return ({ type: INIT_GAME, payload });
}
