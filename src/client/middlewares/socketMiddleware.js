import * as actions from '../redux/actions';
import socketio from '../../server/socketio';

import { setOpponent } from '../hooks/usePlayer';

const socketMiddleware = () => {
  let socket = null;

  // server returns
  const onOpen = (store) => (event) => {
    console.log('websocket open', event.target.url);
    store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = (store) => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);
    console.log('receiving server message');

    switch (payload.type) {
      case 'set-opponent':
        store.dispatch(setOpponent(payload.data));
        break;
      default:
        break;
    }
  };

  // the middleware part of this function
  return (store) => (next) => (action) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = socketio(action.host);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;
      case 'NEW_MESSAGE':
        console.log('sending a message', action.msg);
        socket.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
        break;
      case 'SET_PLAYER':
        console.log('updateplayer in middleware');
        break;
      case 'SET_GRID':
        console.log('updategrid in middleware');
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();
