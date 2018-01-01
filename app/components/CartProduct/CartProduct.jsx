import React, { PropTypes } from 'react';

const CartProduct = ({ price, quantity, title, onRemoveItem }) => (
  <div className="cart-summary">
    <div className="cart-item">{title}</div>
    <div className="cart-quantity">{quantity}</div>
    <div className="cart-item-total">{price}</div>
    <div className="cart-action">
      {onRemoveItem &&
        <button
          onClick={onRemoveItem}
        >
          Remove
        </button>
      }
    </div>
  </div>
);

CartProduct.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  onRemoveItem: PropTypes.func.isRequired
};

export default CartProduct;
