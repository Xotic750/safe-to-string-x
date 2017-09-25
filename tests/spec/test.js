'use strict';

var hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var ifSymbolIt = hasSymbol ? it : xit;
var safeToString;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  safeToString = require('../../index.js');
} else {
  safeToString = returnExports;
}

describe('Basic tests', function () {
  it('should return a string for everything', function () {
    var values = [
      true,
      'abc',
      1,
      null,
      undefined,
      function () {},
      [],
      /r/
    ];
    var expected = values.map(String);
    var actual = values.map(safeToString);
    expect(actual).toEqual(expected);
  });

  it('should throw for Object.create(null)', function () {
    expect(function () {
      safeToString(Object.create(null));
    }).toThrow();
  });

  ifSymbolIt('should return a string for Symbol', function () {
    var sym = Symbol('foo');
    expect(safeToString(sym)).toBe('Symbol(foo)');
    expect(safeToString(Object(sym))).toBe('Symbol(foo)');
  });
});
