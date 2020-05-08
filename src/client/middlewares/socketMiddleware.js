import io from 'socket.io-client';

export const socket = io('http://localhost:4001');

export function socketMiddleware() {
  return ({ dispatch }) => (next) => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    const {
      event,
      leave,
      handle,
      emit,
      payload,
      ...rest
    } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    if (emit) {
      socket.emit(event, payload);
      return;
    }

    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = (result) => dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  };
}
