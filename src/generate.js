// 这里本质就是个 deep stringify

export function stringifyObj(obj = '', deep = 1) {
  if (typeof obj === 'string') return obj;
  const result = {};
  if (deep-- > 0) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        result[key] = stringifyObj(obj[key], deep);
      }
    }
    return result;
  } else {
    return stringify(obj);
  }
}
