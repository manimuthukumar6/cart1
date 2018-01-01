import fetch from 'isomorphic-fetch';
import { isMobileBrowser } from './browserHandlers';
import {
  normalizeJSONResponse,
  normalizeTextResponse,
  isSuccessStatus
} from './fetchHelpers.js';
import runtimeEnvironmentConfig from '../config/runtimeEnvironmentConfig';

const DOMAINS = process.env.ABOF_IS_BROWSER ?
  window.__RUNTIME_ENVIRONMENT_CONFIG__.DOMAINS : // eslint-disable-line no-underscore-dangle
  runtimeEnvironmentConfig[process.env.RUNTIME_ENVIRONMENT || 'default'].DOMAINS;
export const ABOF_DOMAIN = DOMAINS.ABOF_DOMAIN;
export const ABOF_BASE = process.env.ABOF_IS_BROWSER ? '' : `http://${ABOF_DOMAIN}`;
export const ABOF_PRODUCT_API_DOMAIN = DOMAINS.ABOF_PRODUCT_API_DOMAIN;
export const CUSTOMER_HELP_DOMAIN = DOMAINS.CUSTOMER_HELP_DOMAIN;
const ABOF_PRODUCT_API_BASE = process.env.NODE_ENV !== 'production' ? '' : `//${ABOF_PRODUCT_API_DOMAIN}`;
const ABOF_API_BASE_DOMAIN = process.env.ABOF_IS_BROWSER ? '' : `//${ABOF_DOMAIN}`;
export const SAVED_CARDS_API_DOMAIN = DOMAINS.SAVED_CARDS_API_DOMAIN;

const noCache = path => {
  const paramPrefix = path.indexOf('?') === -1 ? '?' : '&';
  return `${path}${paramPrefix}_ts=${new Date().getTime()}`;
};

export const deviceChannel = () => isMobileBrowser() ? 'RWD' : 'Desktop';
const ABOF_STORE_ID = 10154;
const ABOF_LANG_ID = -1;
const CATALOG_ID = '10101';
const ABOF_STORE_BASE = `${ABOF_PRODUCT_API_BASE}/search/resources/store/${ABOF_STORE_ID}`;
const ABOF_API_BASE = `${ABOF_API_BASE_DOMAIN}/wcs/resources/store/${ABOF_STORE_ID}`;

const CART_AGGREGATE_URL_BASE = `${ABOF_API_BASE}/cart/aggregate`;

const resolveUrl = (url, prefixDomain = ABOF_PRODUCT_API_DOMAIN, secure = true) => {
  if (process.env.ABOF_IS_BROWSER || process.env.NODE_ENV !== 'production') {
    return url;
  }

  return `${secure ? 'https' : 'http'}://${prefixDomain}/${url}`;
};

const objToUrlParams = obj =>
  Object.keys(obj).map(k => `${k}=${obj[k]}`).join('&');

const hasStr = (str, x) => str.indexOf(x) !== -1;
const cartApiBase = id => `${ABOF_API_BASE}/cart/${id || '@self'}`;
const addCartApi = () => `${ABOF_API_BASE}/cart?catalogId=10101`;
/* eslint-disable max-len */
const withCommonParams = str => `${str}${hasStr(str, '?') ? '&' : '?'}catalogId=${CATALOG_ID}&responseFormat=json&langId=${ABOF_LANG_ID}`;
/* eslint-enable max-len */
const toStrWithZeros = num => `${parseInt(num, 10)}.0`;




export const fetchGetJSON = url =>
  fetch(url);

export const fetchPutJSON = (url, obj, skipCookies) =>
  fetch(url, Object.assign({
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }, skipCookies ? {} : { credentials: 'include' }));

export const fetchDeleteJSON = url =>
  fetch(url, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

export const fetchPostJSON = (url, obj) =>
  fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });

export const parsingFormEncode = (obj) => {
  let formBody = [];
  let encodedKey;
  let encodedValue;
  Object.keys(obj).map(key => {
    encodedKey = encodeURIComponent(key);
    encodedValue = encodeURIComponent(obj[key]);
    formBody.push(`${encodedKey}=${encodedValue}`);
    return formBody;
  });
  formBody = formBody.join('&');
  return formBody;
};

export const fetchPostForm = (url, obj) =>
  fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: parsingFormEncode(obj)
  });

const Test_API_BASE = 'https://swapi.co/api';

const userProfile = () => noCache(`${Test_API_BASE}/people/1/`);

export const User = {

  fetchProfile: () => fetchGetJSON(userProfile())
    .then(normalizeJSONResponse('User.fetchProfile'))
};

