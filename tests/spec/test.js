/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:11, maxcomplexity:4 */

/*global JSON:true, expect, module, require, describe, xit, it, returnExports */

(function () {
  'use strict';

  var hasSymbol = typeof Symbol === 'function' &&
      typeof Symbol() === 'symbol',
    ifSymbolIt = hasSymbol ? it : xit,
    safeToString;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
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

    ifSymbolIt('should return a string for Symbol', function () {
      var sym = Symbol('foo');
      expect(safeToString(sym)).toBe('Symbol(foo)');
      expect(safeToString(Object(sym))).toBe('Symbol(foo)');
    });
  });
}());
