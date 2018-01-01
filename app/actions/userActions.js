import { actionHelper } from '../../lib/actionHelpers';
import log from 'loglevel';

import { fetchProfile as fetchProfileActions } from '../constants/ActionTypes';

import { User } from '../../lib/api';

export const fetchProfile = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: fetchProfileActions.FETCH
  });

  return actionHelper({
    promiseFn: () => User.fetchProfile(),
    actionTypes: fetchProfileActions,
    dispatch
  });
};
