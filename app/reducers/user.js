import { fromJS } from 'immutable';
import { fetchProfile } from '../constants/ActionTypes.js';

export const initialState = fromJS({
  isFetching: false,
  profile: {}
});

export default (state = initialState, { type, payload, promiseId }) => {
  switch (type) {
    case fetchProfile.FETCH:
      return state.merge({
        isFetching: true,
        promiseId
      });
    case fetchProfile.SUCCESS:
      return state.merge({
        isFetching: false,
        profile: payload,
        promiseId: null
      });
    case fetchProfile.FAILURE:
      return state.merge({
        isFetching: false,
        promiseId: null
      });
    default:
      return state;
  }
};

export const getIsUserLoggedIn = state => state.user.get('isLoggedIn');

export const getIsFetching = state => state.user.get('isFetching');

export const getUserProfile = state => {
  const profile = state.get('profile');
  return (profile && profile.toJS()) || {};
};
