import React, { PropTypes } from 'react';

if (process.env.ABOF_IS_BROWSER) {
  require('./ProductList.scss');
}

const ProductsList = ({ children }) => (
  <div className="product-list">
    <div>{children}</div>
  </div>
);

ProductsList.propTypes = {
  children: PropTypes.node
};

export default ProductsList;
