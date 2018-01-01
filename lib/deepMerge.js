/**
 * deepmerge by Zachary Murray (dremelofdeath) CC-BY-SA 3.0
 */
const deepMerge = (objA = {}, objB = {}) => {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return [...objA, ...objB];
  }

  if (!objA && objB) {
    return objB;
  } else if (objA && !objB) {
    return objA;
  } else if (!objA && !objB) {
    return {};
  }
  /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

  const merged = {};
  for (const each in objB) {
    if (objA.hasOwnProperty(each) && objB.hasOwnProperty(each)) {
      if (typeof(objA[each]) === 'object' && typeof(objB[each]) === 'object') {
        merged[each] = deepMerge(objA[each], objB[each]);
      } else {
        merged[each] = objB[each];
      }
    } else if (objB.hasOwnProperty(each)) {
      merged[each] = objB[each];
    }
  }
  for (const each in objA) {
    if (!(each in objB) && objA.hasOwnProperty(each)) {
      merged[each] = objA[each];
    }
  }
  return merged;
};

export default deepMerge;
