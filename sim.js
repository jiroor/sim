var s = (function() {
  'use strict';

  var typeArray = '[object Array]',
      typeBoolean = '[object Boolean]',
      typeFunction = '[object Function]',
      typeNumber = '[object Number]',
      typeObject = '[object Object]',
      typeString = '[object String]';

  var type = {}.toString;

  function s() {}

  /**
   * @param {Array|Object} collection
   * @param {Function} iterator
   */
  function each(collection, iterator) {
    (isArray(collection) ? eachArray : eachObject).apply(null, arguments);
  }

  /**
   * @param {Array|Object} collection
   * @param {Function} iterator
   */
  function find(collection, iterator) {
    var found;

    each(collection, function(value, key) {
      if (iterator(value, key)) {
        found = value;
        return false;
      }
    });

    return found;
  }

  /**
   * @param {Object} object
   * @param {string} path
   */
  function get(object, path) {
    var paths = path.split('.'),
        key;

    while (key = paths.shift()) {
      object = object[key];

      if (paths.length && !object) {
        break;
      }
    }

    return object;
  }

  /**
   * @param {*} value
   */
  function isArray(value) {
    return Array.isArray(value);
  }

  /**
   * @param {Object} object
   */
  function keys(object) {
    var dest = [];

    each(object, function(value, key) {
      dest.push(key);
    });

    return dest;
  }

  /**
   *
   */
  function noop() {}

  /**
   * @param {Array|Object} collection
   * @param {string} path
   */
  function pluck(collection, path) {
    var dest = [];

    each(collection, function(value) {
      dest.push(get(value, path));
    });

    return dest;
  }

  /**
   * @param {number} min
   * @param {number} max
   */
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {*} accumulator
   */
  function reduce(collection, iterator, accumulator) {
    accumulator = accumulator || [];

    each(collection, function(value, key) {
      accumulator = iterator(accumulator, value, key);
    });

    return accumulator;
  }

  /**
   * @param {string} string
   * @param {string} target
   */
  function startsWith(string, target) {
    return (string.search(target) === 0);
  }

  /**
   * @param {number} n
   * @param {Function} iterator
   */
  function times(n, iterator) {
    var index = -1,
        array = [];

    while (++index < n) {
      array.push(iterator(index));
    }

    return array;
  }

  /**
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {*?} accumulator
   */
  function transform(collection, iterator, accumulator) {
    accumulator = accumulator || (isArray(collection) ? [] : {});

    each(collection, function(value, key) {
      var v = iterator(accumulator, value, key);
      accumulator = v || accumulator;
    });

    return accumulator;
  }

  /**
   * @private
   * @param {Array} array
   * @param {Function} iterator
   */
  function eachArray(array, iterator) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (iterator(array[index], index) === false) {
        break;
      }
    }
  }

  /**
   * @private
   * @param {Object} object
   * @param {Function} iterator
   */
  function eachObject(object, iterator) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if (iterator(object[key], key) === false) {
          break;
        }
      }
    }
  }

  s.each = each;
  s.find = find;
  s.get = get;
  s.isArray = isArray;
  s.keys = keys;
  s.noop = noop;
  s.pluck = pluck;
  s.random = random;
  s.reduce = reduce;
  s.startsWith = startsWith;
  s.times = times;
  s.transform = transform;

  // alias
  s.forEach = each;

  return s;
}).call(this);

//
// public setting
//
if (typeof module === 'object' && module.exports) {
  module.exports = s;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return s; });
}