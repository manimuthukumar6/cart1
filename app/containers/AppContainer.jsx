import React from 'react';
import ProductsContainer from './ProductsContainer';
import CartContainer from './CartContainer';

const AppContainer = () => (
  <div className="checkout-app">
    <h2>Masalas & Spices</h2>
    <ProductsContainer />
    <CartContainer />
  </div>
);

export default AppContainer;
