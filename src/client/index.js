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
// - redux-logger
// - custom socketMiddleWare
const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger(), socketMiddleware),
);

// Render app inside redux context
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app')); // eslint-disable-line no-undef
