import React, { PropTypes } from 'react';
import Prices from '../../../shared/abof-react-components/Prices/Prices';
if (process.env.ABOF_IS_BROWSER) {
  require('./ProductItem.scss');
}

const ProductItem = ({ product, cartProduct, onAddToCartClicked, onRemoveItemClicked }) => {
  const imageEl = (
    <img
      className="product-item__thumbnail"
      alt={product.name}
      src={`${process.env.PUBLIC_PATH}/images/sample.jpg`}
    />
  );
  return (
    <div className="product-item">
      <div className="product-item__box">
        <div className="product-item__thumbnail-region">
            {imageEl}
        </div>
        <div className="product-item__footer">
          <h3 className="product-item__brand">{product.brand}</h3>
          <h3 className="product-item__title">{product.title}</h3>
          <p className="product-item__pack">{product.pack} </p>
          <div className="product-item__pricing">
            <Prices
              sellingPrice={product.price}
              isInline
            />
          </div>
        </div>
        {cartProduct ?
          <div className="product-item__actions">
            <button onClick={onRemoveItemClicked}>-</button>
            <span>{cartProduct.quantity} in cart</span>
            <button onClick={onAddToCartClicked} disabled={product.inventory > 0 ? '' : 'disabled'}>+</button>
          </div> :
          <button
            onClick={onAddToCartClicked}
            disabled={product.inventory > 0 ? '' : 'disabled'}
          >
            {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
          </button>
        }
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  cartProduct: PropTypes.object,
  onAddToCartClicked: PropTypes.func.isRequired,
  onRemoveItemClicked: PropTypes.func.isRequired
};

export default ProductItem;
