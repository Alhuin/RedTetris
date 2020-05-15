import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import './index.css';
import App from './App';
import socketMiddleware from './middlewares/socketMiddleware';

// Initialize redux store and apply those middlewares:
// - redux-thunk (to get dispatch inside action creators, see redux/actions/index.js)
// - redux-logger in dev mode
// - custom socketMiddleWare
let middleware = [];
middleware = process.env.NODE_ENV === 'development'
  ? [...middleware, thunk, createLogger, socketMiddleware]
  : [...middleware, thunk, socketMiddleware];

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

// Render app inside redux context
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app')); // eslint-disable-line no-undef
