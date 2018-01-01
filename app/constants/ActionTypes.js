import { fetchTypes } from '../../lib/actionHelpers.js';

export const RequestTypes = {};

export const fetchProfile = fetchTypes('FETCH_PROFILE');

export const REQUEST_ERROR = 'REQUEST_ERROR';
export const FETCH_ERROR = 'FETCH_ERROR';

// Viewport actions
export const VIEWPORT_WIDTH_MATCHED = 'VIEWPORT_WIDTH_MATCHED';
export const VIEWPORT_WIDTH_NOT_MATCHED = 'VIEWPORT_WIDTH_NOT_MATCHED';

// cart items

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const REMOVE_ITEM_CART = 'REMOVE_ITEM_CART';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

