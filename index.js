/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/safe-to-string-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/safe-to-string-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/safe-to-string-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/safe-to-string-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/safe-to-string-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/safe-to-string-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/safe-to-string-x" title="npm version">
 * <img src="https://badge.fury.io/js/safe-to-string-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6 safeToString module. Converts a `Symbol` literal or object to `Symbol()`
 * instead of throwing a `TypeError`. It's primary use is for logging/debugging.
 * @version 1.1.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module safe-to-string-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:3,
  maxstatements:8, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var $String = String,
    ES, pToString, isSymbol;

  if (require('has-symbol-support-x')) {
    ES = require('es-abstract/es6');
    isSymbol = require('is-symbol');
    pToString = Symbol.prototype.toString;
    /**
     * The abstract operation `safeToString` converts a `Symbol` literal or
     * object to `Symbol()` instead of throwing a `TypeError`.
     *
     * @param {*} value The value to convert to a string.
     * @return {string} The converted value.
     * @example
     * var safeToString = require('safe-to-string-x');
     *
     * safeToString(); // 'undefined'
     * safeToString(null); // 'null'
     * safeToString('abc'); // 'abc'
     * safeToString(true); // 'true'
     * safeToString(Symbol('foo')); // 'Symbol(foo)'
     * safeToString(Symbol.iterator); // 'Symbol(Symbol.iterator)'
     * safeToString(Object(Symbol.iterator)); // 'Symbol(Symbol.iterator)'
     */
    module.exports = function safeToString(value) {
      return isSymbol(value) ? ES.Call(pToString, value): $String(value);
    };
  } else {
    module.exports = $String;
  }
}());
