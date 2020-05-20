/* eslint-disable no-undef */
import reducer from '../../src/client/redux/reducer';
import {
  SET_GAME_STATUS,
  SET_ERROR,
  SET_DARKMODE,
  SET_READY,
  INIT_USER,
  SET_SHADOW,
  SET_USERS,
} from '../../src/client/redux/actions/types';

describe('Reducer :', () => {
  const { socket } = reducer(undefined, {});
  let expectedState;

  beforeEach(() => {
    expectedState = {
      socket,
      username: '',
      roomName: '',
      error: '',
      gameStatus: 0, // 0 not launched, 1 launched, 2 ended
      shadow: [],
      ready: false,
      users: [],
      darkmode: true,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle SET_READY', () => {
    const payload = {
      type: SET_READY,
      payload: true,
    };
    expect(reducer(undefined, payload)).toEqual({
      ...expectedState,
      ready: payload.payload,
    });
  });

  it('should handle SET_USERS', () => {
    const payload = {
      type: SET_USERS,
      payload: [
        'jojo',
        'juju',
      ],
    };
    expect(reducer(undefined, payload)).toEqual({
      ...expectedState,
      users: payload.payload,
    });
  });

  it('should handle INIT_USER', () => {
    const payload = {
      type: INIT_USER,
      payload: {
        username: 'jojo',
        roomName: 'jojoRoom',
      },
    };
    expect(reducer(undefined, payload)).toEqual({
      ...expectedState,
      username: payload.payload.username,
      roomName: payload.payload.roomName,
      ready: true,
    });
  });

  it('should handle SET_ERROR', () => {
    const payload = {
      type: SET_ERROR,
      payload: 'I AM (T)ERROR',
    };
    expect(reducer(undefined, payload)).toEqual({
      ...expectedState,
      error: payload.payload,
    });
  });

  it('should handle SET_DARKMODE', () => {
    const payload = {
      type: SET_DARKMODE,
    };
    expect(reducer(undefined, payload)).toEqual({
      ...expectedState,
      darkmode: false,
    });
  });

  it('should handle SET_SHADOW', () => {
    const payload = {
      type: SET_SHADOW,
      payload: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ],
    };
    expect(reducer(undefined, payload)).toEqual({
      ...expectedState,
      shadow: payload.payload, // it tests well if 2D tabs are equal
    });
  });

  it('should handle SET_GAME_STATUS', () => {
    const payload = {
      type: SET_GAME_STATUS,
      gameStatus: 3,
    };
    expect(reducer(undefined, payload)).toEqual({
      ...expectedState,
      gameStatus: payload.payload,
    });
  });
});
