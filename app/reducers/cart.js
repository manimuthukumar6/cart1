import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE, REMOVE_CART, REMOVE_ITEM_CART
} from '../constants/ActionTypes';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  addedIds: [],
  quantityById: {}
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state;
      }
      return [...state, action.productId];
    case REMOVE_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state.filter(item => item !== action.productId);
      }
      return state;
    case REMOVE_ITEM_CART:
      if (state.indexOf(action.productId) !== -1 && action.qty === 1) {
        return state.filter(item => item !== action.productId);
      }
      return state;
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { productId } = action;
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      };
    }
    case REMOVE_CART: {
      const { productId } = action;
      const obj = Object.keys(state).reduce((result, key) => {
        if (key !== productId.toString()) {
          const finalObj = Object.assign({}, result, { [key]: state[key] });
          return finalObj;
        }
        return result;
      }, {});
      return obj;
    }
    case REMOVE_ITEM_CART: {
      const { productId } = action;
      if (productId in state && action.qty === 1) {
        const obj = Object.keys(state).reduce((result, key) => {
          if (key !== productId.toString()) {
            const finalObj = Object.assign({}, result, { [key]: state[key] });
            return finalObj;
          }
          return result;
        }, {});
        return obj;
      }
      return { ...state,
        [productId]: (state[productId] || 0) - 1
      };
    }
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    case REHYDRATE:
      if (action.payload && action.payload.cart) {
        return { ...state, ...action.payload.cart };
      }
      return state;
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      };
  }
};

export default cart;
