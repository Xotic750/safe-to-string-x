/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:6, maxcomplexity:3 */

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

  describe('Basic tests', function () {
    it('should return a string for everything', function () {
      function fn() {}
      var values = [true, 'abc', 1, null, undefined, fn, [], /r/],
          expected = values.map(String),
          actual = values.map(safeToString);
      expect(actual).toEqual(expected);
    });

    ifSymbolIteratorIt('should return a string for Symbol', function () {
      expect(safeToString(Symbol.iterator)).toEqual('#<Symbol>');
    });
  });
}());
