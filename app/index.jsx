import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import log from 'loglevel';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import configureLogger from '../lib/logLevelConfig';
import reducers from './reducers/index.js';
import { createRoutes } from './routes.jsx';
import RequestErrorMiddleware from './middleware/networkError';
import '../lib/arrayFindPolyfill.js';
import { getAllProducts } from './actions';
import { persistStore, autoRehydrate } from 'redux-persist';


configureLogger(log);

const checkoutReducers = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));

let middleware = applyMiddleware(thunk, routerMiddleware(browserHistory), RequestErrorMiddleware);

if (process.env.NODE_ENV !== 'production') {
  if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    middleware = compose(middleware, window.devToolsExtension(), autoRehydrate());
  }
}

const store = createStore(
  checkoutReducers,
  window.__INITIAL_STATE__, // eslint-disable-line no-underscore-dangle
  middleware
);

persistStore(store, { whitelist: ['cart'] });

const reduxHistory = syncHistoryWithStore(browserHistory, store);

store.dispatch(getAllProducts());

render(
  <Provider store={store}>
    <Router routes={createRoutes(store)} history={reduxHistory} />
  </Provider>,
  document.getElementById('checkout-app')
);

/* Required for hot module replacement during development */

if (module.hot) {
  module.hot.accept();
}
