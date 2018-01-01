const paymentErrorMessages = {
  ABOF_PAYMENT_ERROR_CODE_1: 'Oh no! Your payment didn\'t go through. Give it another shot.',
  ABOF_PAYMENT_ERROR_CODE_2: 'No way! It seems, you cancelled your transaction.',
  ABOF_PAYMENT_ERROR_CODE_3: 'No way! It seems, you cancelled your transaction.',
  ABOF_PAYMENT_ERROR_CODE_4: 'Hang on! We are waiting for a response from the bank.',
  ABOF_PAYMENT_ERROR_CODE_5: 'Oh No! There is a connectivity issue at this time.',
  ABOF_PAYMENT_ERROR_CODE_6: 'Oh No! There is a connectivity issue at this time.',
  ABOF_PAYMENT_ERROR_CODE_7: 'Oh No! There is a connectivity issue at this time.',
  ABOF_PAYMENT_ERROR_CODE_14: 'Woohoo! Your payment went through.',
  ABOF_PAYMENT_ERROR_CODE_15: 'Oh No! There\'s a glitch. Order cancelled.',
  ABOF_PAYMENT_ERROR_CODE_16: 'Oh no! Your payment didn\'t go through. Give it another shot.',
  ABOF_PAYMENT_ERROR_CODE_17: 'Oh no! Your payment didn\'t go through. Give it another shot.',
  ABOF_PAYMENT_ERROR_CODE_SC: 'Oops! Store Credit cannot be applied to this order.',
  ABOF_PAYMENT_ERROR_CODE_failure: 'Oh no! Your payment didn\'t go through. Give it another shot.',
  ABOF_PAYMENT_ERROR_CODE_GC: 'Oops! Gift Voucher cannot be applied to this order.',
  ABOF_PAYMENT_ERROR_CODE_COD: 'COD cannot be used for this order'
};

const loginErrorMessages = {
  ABOF_EMAIL_DOMAIN_NOT_ALLOWED: 'Oops! We don\'t support temporary & disposable email addresses',
  ABOF_FIRSTNAME_LENGTH_EXCEEDS: 'The first name should be less than 64 characters',
  ABOF_LASTNAME_LENGTH_EXCEEDS: 'The last name should be less than 64 characters',
  _ERR_CMD_MISSING_PARAM: 'Email Id is required to Sign-Up', /* Assuming only email will be missing */
  ABOF_LOGIN_SOCIAL_USER_ERROR: 'Uh oh! You seem to have an account with Facebook/Google+',
  _ERR_PASSWORD_EXPIRED: 'Password Expired!',
  FACEBOOK_SDK_INIT_FAIL: 'Sorry Facebook seems to be blocked on your network. Try another method to login.',
  GOOGLE_SDK_INIT_FAIL: 'Sorry Google seems to be blocked on your network. Try another method to login.'
};

const messagesMap = Object.assign({
  CARD_NUMBER_NOT_VALID: 'Something doesn\'t add up! Check card details.',
  DELIVERY_CHARGE: charge => `A delivery charge of Rs ${charge} applied.`,
  // ITEM_GONE: 'Tough luck! Something you liked is gone.',
  ITEM_GONE: 'Some items in your bag are out of stock. Please remove them to proceed.',
  NO_COD: 'Buzzkill! COD is not available for your pin code',
  NO_COD_ORDER_BLOCKED: 'Oops! COD is not available on the applied coupon.',
  NO_COD_USER_BLOCKED: 'Buzzkill! COD is blocked for this account.',
  NO_COD_PRICE: 'Buzzkill! COD is not available on this order.',
  COD_MAX_LIMIT: (codMaxLimit) => `Buzzkill! Your order exceeds the COD Limit of ₹${codMaxLimit}. Please choose another payment option.`, // eslint-disable-line max-len
  CASH_BACK_ELIGIBLE: (cashBackAmount, cashbackDate) => `Congratulations! Your order is eligible for a cashback of ₹${cashBackAmount}. You will get the cashback on ${cashbackDate}. Happy shopping.`, // eslint-disable-line max-len
  CASH_BACK_SUCCESS_PAYMENT_HEADING: (cashBackAmount) => `Get ₹${cashBackAmount} cashback`,
  CASH_BACK_SUCCESS_PAYMENT_DESC: (couponLongDescription) => `${couponLongDescription}`,
  USE_GIFT_CARD_BALANCE: balance => `Use ₹${balance} gift card balance for this purchase`,
  GIFT_CARD_BALANCE_EXPIRY: (balance, date) => `₹${balance} Expires on ${date}`,
  ZERO_AMOUNT_PAYABLE_CONFIRM_ORDER: 'Amount Payable is 0, Click on "Confirm Order" to proceed',
  ERR_PROMO_ELIGIBLE: 'Oops! Coupon not applicable on current cart.',
  COUPON_APPLY_SUCCESS: (amount, coupon) => `Wow! You just saved ₹${amount} by applying coupon ${coupon}`,
  CASH_BACK_APPLY_SUCCESS: (amount, msg) => `Hurray ! You are eligible for ₹${amount} cashback. ${msg}`,
  INVALID_COUPON: 'Damn! This coupon code is not valid.',
  REMOVED_COUPON: 'Oops, this coupon is no longer available on your cart',
  INVALID_LOGIN_FORGOT_PWD_WARNING: html => `Looks like you have trouble signing in. ${html}`,
  INSUFFICIENT_WALLET_BALANCE: 'You don\'t have enough balance in your Citrus wallet to make this payment. please use another payment method', // eslint-disable-line max-len
  MRP_PROMO_MESSAGE_WARNING: 'This coupon code is applicable only on MRP value of products. By applying this coupon, prices of qualifying products will be reset to MRP value.', // eslint-disable-line max-len
  NO_COUPONS_AVAILABLE_FOR_CART: 'Hurray! You are already getting the best deals on the current shopping bag. No coupon available on the current bag.', // eslint-disable-line max-len
  UN_SERVICEABLE_PIN_CODE: 'Damn! Unserviceable address. Time for plan B?.'
}, paymentErrorMessages, loginErrorMessages);

export const Messages = Object.keys(messagesMap)
  .reduce((acc, m) => Object.assign({ [m]: m }, acc), {});

export default (messageId, ...rest) => {
  const message = messagesMap[messageId];
  if (!messageId || !message) {
    console.warn('No message found for', messageId); // eslint-disable-line no-console
    return null;
  }

  if (typeof message === 'function') {
    return message(...rest);
  }

  return messagesMap[messageId];
};
