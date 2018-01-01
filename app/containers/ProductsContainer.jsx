import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeItem } from '../actions';
import { getVisibleProducts } from '../reducers/products';
import ProductItem from '../components/ProductItem/ProductItem';
import ProductsList from '../components/ProductsList/ProductsList';
import { getCartProducts } from '../reducers';

const addedItem = (cartProducts, productId) => Object.values(cartProducts).find(item => item.id === productId);

const ProductsContainer = ({ products, cartProducts, onAddToCart, onRemoveItem }) => (
  <ProductsList>
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => onAddToCart(product.id)}
        onRemoveItemClicked={() => onRemoveItem(product.id)}
        cartProduct={addedItem(cartProducts, product.id)}
      />
    )}
  </ProductsList>
);

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array,
  onRemoveItem: PropTypes.func.isRequired
};


const mapStateToProps = state => (
  {
    products: getVisibleProducts(state.products),
    cartProducts: getCartProducts(state)
  });

export default connect(
  mapStateToProps,
  { onAddToCart: addToCart,
    onRemoveItem: removeItem
  }
)(ProductsContainer);
