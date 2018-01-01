/* global jQuery */
import trim from './trim.js';
import * as cardUtils from './cardUtils.js';

import { alphabetsWithDotAndSpace } from '../app/constants/RegexpConstants.js';
import getMessage, { Messages } from '../app/constants/MessageConstants.js';

/**
 * @see https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/utils/validation.js
 */
const isEmpty = value => value === undefined || value === null || value === '';

const join = (rules) => (value, data) => {
  const errors = rules
    .map(rule => rule(value, data))
    .filter(error => !!error);
  return errors.length && errors[0];
};

/**
 * @see http://emailregex.com/
 */
const emailRegex = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i; // eslint-disable-line max-len

export const email = value => {
  if (!isEmpty(value) && !emailRegex.test(value)) {
    return 'Invalid email address';
  }

  return null;
};

export const required = value => {
  if (isEmpty(value)) {
    return 'Required';
  }

  return null;
};

export const minLength = min =>
  value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }

    return null;
  };

export const maxLength = max =>
  value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }

    return null;
  };

export const fieldLength = n =>
  value => {
    if (!isEmpty(value) && value.length !== n) {
      return `Must have exactly ${n} characters`;
    }

    return null;
  };

export const integer = value => {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }

  return null;
};

export const validCard = value => {
  if (!value) {
    return null;
  }

  const num = value.replace(/ /g, '');

  if (integer(num)) {
    return integer(num);
  }

  if (!jQuery.payment.validateCardNumber(num)) {
    return getMessage(Messages.CARD_NUMBER_NOT_VALID);
  }

  return null;
};

export const validateCVV = (value, data) => {
  if ((cardUtils.is19(data.ccNumber) || cardUtils.isMaestro(data.ccNumber)) && !value) {
    return null;
  }

  const scheme = cardUtils.cardScheme(data.ccNumber);
  if (!value) {
    return 'This field is required';
  }

  if (!jQuery.payment.validateCardCVC(value, scheme)) {
    return 'Invalid cvv, please try again';
  }

  return null;
};

export const validateExpiryMonth = (month, data) => {
  if (cardUtils.is19(data.ccNumber) && !month) {
    return null;
  }

  const not2Digits = fieldLength(2);
  if (not2Digits(month)) {
    return not2Digits(month);
  }

  const year = data.expiryYear ? data.expiryYear : (new Date()).getFullYear() + 1;

  if (!jQuery.payment.validateCardExpiry(month, year)) {
    return 'Invalid month, please pick a valid month';
  }

  return null;
};

export const validateExpiryYear = (year, data) => {
  if (cardUtils.is19(data.ccNumber) && !year) {
    return null;
  }

  const not4Digits = fieldLength(4);
  if (not4Digits(year)) {
    return not4Digits(year);
  }

  const month = data.expiryMonth ? data.expiryMonth : (new Date()).getMonth() + 1;
  if (!jQuery.payment.validateCardExpiry(month, year)) {
    return 'Invalid year, please pick a valid year';
  }

  return null;
};

export const validateName = value => {
  if (!value) {
    return 'Name can not be empty';
  }

  const val = trim(value);
  if (!val) {
    return 'Name can not be empty';
  }

  if (val.length > 64) {
    return 'The name should be less than 64 characters.';
  }

  if (!alphabetsWithDotAndSpace.test(val)) {
    return 'Please only use letters and . and space characters for name.';
  }

  return null;
};

export const validateCardName = validateName;

const phoneRegex = /^[1-9][0-9]*$/;
export const validatePhone = value => {
  if (!value) {
    return null;
  }

  const val = trim(value);
  if (val.length !== 10) {
    return 'Phone number must be 10 digits. Please check the number you have entered';
  }

  if (!phoneRegex.test(val)) {
    return 'Woah! That\'s no mobile number. Something is surely wrong.';
  }

  return null;
};

const addressRegex = /^[a-zA-Z0-9.,:;'&\/\(\)#-\s]*$/;
export const validateAddress = value => {
  const val = trim(value);
  if (!val) {
    return 'Required';
  }
  /* if (val.length < 10) {
    return 'Woah! Your address is waaaay too short.';
  }

  if (val.length > 140) {
    return 'Woah! Your address is waaaay too long.';
  } */

  if (!addressRegex.test(val)) {
    return 'Sorry! You cannot use the following characters !^"$%*+<>=?@[]_{}|~';
  }

  return null;
};

export const validateAddressLine1 = value => {
  const val = trim(value);
  if (!val) {
    return 'Required';
  }

  if (val.length > 39) {
    return 'Door address can have max. 39 characters.';
  }

  if (!addressRegex.test(val)) {
    return 'Sorry! You cannot use the following characters !^"$%*+<>=?@[]_{}|~';
  }

  return null;
};

export const validateAddressLine2 = value => {
  const val = trim(value);
  if (!val) {
    return 'Required';
  }

  if (val.length > 100) {
    return 'Street address can have max. 100 characters.';
  }

  if (!addressRegex.test(val)) {
    return 'Sorry! You cannot use the following characters !^"$%*+<>=?@[]_{}|~';
  }

  return null;
};

export const validateLandmark = value => {
  if (!value) {
    return null;
  }

  const val = trim(value);
  if (!val) {
    return null;
  }

  if (val.length > 70) {
    return 'Woah! Your landmark text is waaaay too long.';
  }

  if (!addressRegex.test(val)) {
    return 'Sorry! You cannot use the following characters !^"&$%*+<>=?@[]_{}|~';
  }
  return null;
};

export const validatePassword = value => {
  if (!value) {
    return null;
  }

  const val = trim(value);
  if (!val) {
    return 'Please choose a password';
  }

  if (val.length < 6) {
    return 'Your password should be at least 6 characters long';
  }
  return null;
};

// export function oneOf(enumeration) {
//   return value => {
//     if (!~enumeration.indexOf(value)) {
//       return `Must be one of: ${enumeration.join(', ')}`;
//     }
//   };
// }

// export function match(field) {
//   return (value, data) => {
//     if (data) {
//       if (value !== data[field]) {
//         return 'Do not match';
//       }
//     }
//   };
// }

export const createValidator = rules => (data = {}) =>
  Object.keys(rules).reduce((errors, key) => {
    const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
    const error = rule(data[key], data);
    return Object.assign({}, errors, { [key]: error });
  }, {});
