import shop from '../api/shop';
import * as types from '../constants/ActionTypes';

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
});

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products));
  });
};

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
});

const removeFromCartUnsafe = (productId, qty) => ({
  type: types.REMOVE_CART,
  productId,
  qty
});

const removeFromCartItemUnsafe = (productId, qty) => ({
  type: types.REMOVE_ITEM_CART,
  productId,
  qty
});

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const removeCart = productId => (dispatch, getState) => {
  const quantityById = getState().cart.quantityById[productId];
  if (quantityById > 0) {
    dispatch(removeFromCartUnsafe(productId, quantityById));
  }
};

export const removeItem = productId => (dispatch, getState) => {
  const quantityById = getState().cart.quantityById[productId];
  if (quantityById > 0) {
    dispatch(removeFromCartItemUnsafe(productId, quantityById));
  }
};

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState();

  dispatch({
    type: types.CHECKOUT_REQUEST
  });
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    });
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  });
};
