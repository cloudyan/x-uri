// https://github.com/unshiftio/querystringify/blob/master/index.js

var has = Object.prototype.hasOwnProperty;

function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

export function parse(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  for (;
    part = parser.exec(query);
    result[decode(part[1])] = decode(part[2])
  );

  return result;
}

export function stringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}
