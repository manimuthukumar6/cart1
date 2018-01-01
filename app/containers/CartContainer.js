import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkout, removeCart } from '../actions';
import { getTotal, getCartProducts } from '../reducers';
import Cart from '../components/Cart/Cart';

const CartContainer = ({ products, total, onCheckout, onRemoveCart }) => (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => onCheckout(products)}
    onRemoveItem={onRemoveCart}
  />
);

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  onCheckout: PropTypes.func.isRequired,
  onRemoveCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
});

export default connect(
  mapStateToProps,
  { onCheckout: checkout, onRemoveCart: removeCart }
)(CartContainer);
