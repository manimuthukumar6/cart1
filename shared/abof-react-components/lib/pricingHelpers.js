/**
 * Loosely based on:
 * @see https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
 */
export const formatMoney = n => {
  if (isNaN(n)) {
    /* In few cases application displays NaN. This is a technical term. Better to show empty */
    return '';
  }
  const x = Math.round(n).toString();
  let lastThree = x.substring(x.length - 3);
  const rest = x.substring(0, x.length - 3);
  if (rest) {
    lastThree = `,${lastThree}`;
  }

  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
};

export const discountCalculation = (original, current) => {
  if (!original || !current || isNaN(original) || isNaN(current)) {
    return {
      isDiscounted: false,
      currentPrice: current,
      discount: null
    };
  }

  const isDiscounted = original !== current;
  return {
    isDiscounted,
    currentPrice: isDiscounted ? original : current,
    discount: isDiscounted ? Math.round(((original - current) / original) * 100) : null
  };
};
