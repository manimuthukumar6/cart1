import 'babel-polyfill';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { createRoutes } from '../../app/routes';
import reducers from '../../app/reducers/index';
import RequestErrorMiddleware from '../../app/middleware/networkError';


const renderPathToString = (ctx, store) =>
  new Promise((resolve, reject) => {
    match({ routes: createRoutes(store), location: ctx.request.path }, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error);
      } else if (redirectLocation) {
        return reject({ rejectionType: 'redirect', payload: { redirectLocation: redirectLocation.pathname } });
      } else if (!renderProps) {
        return reject(`Could not find a component to render for path ${ctx.request.path}`);
      }

      const prefetchPromises = renderProps.components.map((c) => {
        /* Unwrap component. We might need to do this recursively, but so far just
           this much seems to work for all our existing components. If a prefetch()
           is not being called, start with debugging this bit. */
        let component = c;
        if (component.WrappedComponent) {
          component = component.WrappedComponent;
        }

        /* prefetch() should return a promise that is resolved when all requests required
           to prerender the component have returned and all the actions that must be dispatched
           to prerender the component have been dispatched. If the component has children that
           need to be prerendered, it should account for those in its prefetch(). */
        if (component.prefetch) {
          return component.prefetch(renderProps.params, renderProps.location, store.dispatch.bind(store), ctx);
        }

        return Promise.resolve();
      });

      return Promise.all(prefetchPromises).then(() =>
        resolve(renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )));
    });
  });

const renderReactApplication = () => {
  const checkoutReducers = combineReducers(Object.assign({ form: formReducer }, reducers));
  const store = createStore(
    checkoutReducers,
    applyMiddleware(thunk, RequestErrorMiddleware)
  );

  return function* renderReactApplicationMiddleware(next) {
    try {
      this.state.checkoutAppBody = yield renderPathToString(this, store);
      /* TODO: this.state.checkoutAppInitialState = getStateAsJs(store.getState()); */
    } catch (error) {
      if (error.rejectionType === 'redirect') {
        this.redirect(error.payload.redirectLocation);
        return;
      }
    }

    yield next;
  };
};

module.exports = renderReactApplication;
