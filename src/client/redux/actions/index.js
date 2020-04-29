import {
  SET_USERNAME,
  SET_SOCKET,
  ROOM_JOINED,
  SET_ADMIN,
  SET_ROOM_STATE,
} from './types';

export function setUsername(payload) {
  return ({ type: SET_USERNAME, payload });
}

export function setSocket(payload) {
  return ({ type: SET_SOCKET, payload });
}

export function roomJoined(payload) {
  return ({ type: ROOM_JOINED, payload });
}

export function setAdmin(payload) {
  return ({ type: SET_ADMIN, payload });
}

export function setRoomState(payload) {
  return ({ type: SET_ROOM_STATE, payload });
}
