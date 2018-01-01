import { fromJS } from 'immutable';

import {
  VIEWPORT_WIDTH_MATCHED,
  VIEWPORT_WIDTH_NOT_MATCHED
} from '../constants/ActionTypes';

export const initialState = fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case VIEWPORT_WIDTH_MATCHED:
      return state.merge({
        [action.payload.media]: true
      });

    case VIEWPORT_WIDTH_NOT_MATCHED:
      return state.merge({
        [action.payload.media]: false
      });

    default:
      return state;
  }
};
