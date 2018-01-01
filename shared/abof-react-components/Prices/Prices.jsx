import React from 'react';

import { formatMoney, discountCalculation } from '../lib/pricingHelpers.js';

if (process.env.ABOF_IS_BROWSER) {
  require('./Prices.scss');
}

const Prices = ({ sellingPrice, listPrice, isInline, swapListAndSellingPrices, freePrice }) => {
  const baseClassName = 'prices';
  const classNames = [baseClassName];

  const { isDiscounted, discount } = discountCalculation(listPrice, sellingPrice);

  let firstPriceEl = isDiscounted &&
        (<div className="prices__price prices__price--list">₹{formatMoney(listPrice)}</div>);
  let secondPriceEl = sellingPrice &&
    (<div className="prices__price prices__price--selling">₹{formatMoney(sellingPrice)}</div>);
  let thirdPrice = freePrice &&
    (<div className="prices__price prices__price--free">₹{formatMoney(freePrice)}</div>);

  if (swapListAndSellingPrices) {
    const temp = firstPriceEl;
    firstPriceEl = secondPriceEl;
    secondPriceEl = temp;
  }

  if (isInline) {
    classNames.push(`${baseClassName}--inline`);
  }

  return (
    <div className={classNames.join(' ')}>
      {firstPriceEl}
      {secondPriceEl}
      {thirdPrice}
      {isDiscounted &&
        (<div className="prices__discount">{discount}%</div>)}
    </div>
  );
};

Prices.propTypes = {
  isInline: React.PropTypes.bool,
  listPrice: React.PropTypes.number,
  sellingPrice: React.PropTypes.number,
  swapListAndSellingPrices: React.PropTypes.bool,
  freePrice: React.PropTypes.number
};

export default Prices;
