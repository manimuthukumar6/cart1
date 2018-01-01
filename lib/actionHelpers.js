import uuid from 'uuid';
import log from 'loglevel';

import { REQUEST_ERROR, FETCH_ERROR } from '../app/constants/ActionTypes.js';

import promisesStore from './promisesStore.js';

/**
 * Creates actions representing the three states of a fetch operation.
 *
 * E.g:
 *
 *   > fetchTypes('LOGIN');
 *
 * returns:
 *
 *   > { FETCH: 'LOGIN_FETCH', SUCCESS: 'LOGIN_SUCCESS', FAILURE: 'LOGIN_FAILURE' }
 */
export const fetchTypes = typePrefix =>
  ['FETCH', 'SUCCESS', 'FAILURE']
    .map(t => [t, `${typePrefix}_${t}`])
    .reduce((acc, t) => Object.assign({}, acc, { [t[0]]: t[1] }), {});

/**
 * Helper to dispatch actions and transform data, for JSON api
 * requests.
 *
 * @param {string} [id] - Used to uniquely identify request
 * actions. `id` is passed as parameter with all the asyn actions
 * dispatched
 *
 * @param {() => Promise} promiseFn - The request around which actions
 * are dispatched.
 *
 * @param {function} [transform] - Transform for successful response.
 *
 * @param {function} [errorTransform] - Transform for api response with error.
 *
 * @param {object} actionTypes - Action type constants. Should have
 * SUCCESS, FAILURE constants.
 *
 * @param {function} dispatch react-redux dispatch method.
 *
 * @return {Promise} - The transformed success/error response.
 *
 * NOTE: FETCH action is not dispatched in this method. Probably it
 * can be.
 *
 * Starts by calling the promiseFn. If the function resolves and the
 * returned response is a 200, applies the transformFn to the returned
 * JSON. Finally dispatches the action contained in
 * actionTypes.SUCCESS with the transformed JSON as payload.
 *
 * On failure, dispatches the action contained in actionTypes.FAILURE
 * with the optionally transformed error as the payload. The format
 * for the error payload is { errors: [array, of, errors] }. Each
 * error in the array can be any type, we don't care. As long as
 * whoever is using the object downstream deals with it properly.
 */
export const actionHelper = ({
  id,
  promiseFn,
  transform,
  errorTransform,
  actionTypes,
  dispatch,
  ignoreNetworkErrors = true,
  skipResponseActions
}) => {
  const executePromiseFn = () => promiseFn().then(res => {
    const idPayload = id ? { id } : {};
    if (res && res.ok) {
      const transformedData = transform ? transform(res.json) : res.json;
      if (!skipResponseActions) {
        dispatch(Object.assign({
          type: actionTypes.SUCCESS,
          payload: transformedData
        }, idPayload));
      }
      return Promise.resolve(transformedData);
    }

    const transformedError = errorTransform ? errorTransform(res.json) : res.json;
    if (!skipResponseActions) {
      dispatch(Object.assign({
        type: actionTypes.FAILURE,
        payload: transformedError
      }, idPayload));
    }

    if (transformedError) {
      dispatch(Object.assign({
        type: FETCH_ERROR,
        payload: transformedError
      }, idPayload));
    }


    if (!ignoreNetworkErrors) {
      dispatch({
        type: REQUEST_ERROR,
        payload: transformedError
      });
    }
    return Promise.reject(transformedError);
  }).catch(e => {
    if (e && e.appGeneratedError) {
      return Promise.reject(e); // App Generated error. Skip logging
    }
    if (e && e.stack) {
      log.error(actionTypes.FETCH, e.stack);
    } else {
      log.error('An error occurred while fetching a request', actionTypes.FETCH, e);
    }

    return Promise.reject(e);
  });
  return executePromiseFn();
};

/**
 * A helper function, wrapping `actionHelper` to dispatch `FETCH`
 * action, with a promise id. Promise is stored
 */
export const reqActionHelper = ({
  id,
  promiseFn,
  transform,
  errorTransform,
  actionTypes,
  dispatch,
  ignoreNetworkErrors = true,
  skipResponseActions
}) => {
  const promiseId = uuid.v4();

  dispatch(Object.assign({
    type: actionTypes.FETCH,
    promiseId
  }, id ? { id } : {}));

  const promise = actionHelper({
    id,
    promiseFn,
    transform,
    errorTransform,
    actionTypes,
    dispatch,
    ignoreNetworkErrors,
    skipResponseActions
  });

  promisesStore.set(promiseId, promise);

  return promise;
};
