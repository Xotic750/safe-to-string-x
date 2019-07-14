const hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const ifSymbolIt = hasSymbol ? it : xit;
let safeToString;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  safeToString = require('../../index.js');
} else {
  safeToString = returnExports;
}

describe('basic tests', function() {
  it('should return a string for everything', function() {
    const values = [true, 'abc', 1, null, undefined, function() {}, [], /r/];
    const expected = values.map(String);
    const actual = values.map(safeToString);
    expect(actual).toStrictEqual(expected);
  });

  it('should throw for Object.create(null)', function() {
    expect(function() {
      safeToString(Object.create(null));
    }).toThrow();
  });

  ifSymbolIt('should return a string for Symbol', function() {
    const sym = Symbol('foo');
    expect(safeToString(sym)).toBe('Symbol(foo)');
    expect(safeToString(Object(sym))).toBe('Symbol(foo)');
  });
});
