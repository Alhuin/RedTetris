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

const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger()),
);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app')); // eslint-disable-line no-undef

module.hot.accept();
