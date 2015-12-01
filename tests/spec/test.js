/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:7, maxcomplexity:3 */

/*global expect, module, require, describe, xit, it, returnExports */

(function () {
  'use strict';

  var hasSymbolIterator = typeof Symbol === 'function' &&
      typeof Symbol.iterator === 'symbol',
    ifSymbolIteratorIt = hasSymbolIterator ? it : xit,
    safeToString;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    safeToString = require('../../index.js');
  } else {
    safeToString = returnExports;
  }

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	function twoString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	}

  describe('Basic tests', function () {
    it('should return a string for everything', function () {
      function fn() {}
      var values = [true, 'abc', 1, null, undefined, fn, [], /r/],
          expected = values.map(String),
          actual = values.map(safeToString);
      expect(actual).toEqual(expected);
    });

    ifSymbolIteratorIt('should throw for Symbol', function () {
      var sym = Symbol('foo');
      expect(function () {
        twoString(sym);
      }).toThrow();
      expect(function () {
        twoString(Object(sym));
      }).toThrow();
      expect(function () {
        twoString(Symbol.iterator);
      }).toThrow();
    });

    ifSymbolIteratorIt('should return a string for Symbol', function () {
      var sym = Symbol('foo');
      expect(safeToString(sym)).toBe('Symbol(foo)');
      expect(safeToString(Object(sym))).toBe('Symbol(foo)');
      expect(safeToString(Symbol.iterator)).toBe('Symbol(Symbol.iterator)');
    });
  });
}());
