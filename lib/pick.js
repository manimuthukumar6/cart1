export default (obj, keys) =>
  Object.assign(...keys.map(k => ({ [k]: obj[k] })));
