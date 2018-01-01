import React, { PropTypes } from 'react';
import CartProduct from '../CartProduct/CartProduct';

if (process.env.ABOF_IS_BROWSER) {
  require('./Cart.scss');
}

const Cart = ({ products, total, onCheckoutClicked, onRemoveItem }) => {
  const hasProducts = products.length > 0;
  const nodes = hasProducts ? (
    products.map(product =>
      <CartProduct
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
        onRemoveItem={() => onRemoveItem(product.id)}
      />
    )
  ) : (
    <em className="notify-error">Please add some products to cart.</em>
  );

  return (
    <div className="cart">
      <h3>Your Cart Summary</h3>
      {hasProducts &&
        <div>
          <div className="cart-total">
            <div className="cart-total-left">
              <p>{products.length > 1 ? 'Items' : 'Item'} in cart</p>
              <h3>{products.length}</h3>
            </div>
            <div className="cart-total-right">
              <p>Total: ₹</p>
              <h3>{total}</h3>
            </div>
          </div>
          <div className="cart-summary">
            <div className="cart-item">Item</div>
            <div className="cart-quantity">Quantity</div>
            <div className="cart-item-total">Total</div>
            <div className="cart-action"> </div>
          </div>
        </div>
      }
      {nodes}
      <button
        onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}
      >
        Checkout
      </button>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  onRemoveItem: PropTypes.func.isRequired
};

export default Cart;
