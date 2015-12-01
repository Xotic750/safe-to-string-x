<a name="module_safe-to-string-x"></a>
## safe-to-string-x
<a href="https://travis-ci.org/Xotic750/safe-to-string-x"
title="Travis status">
<img src="https://travis-ci.org/Xotic750/safe-to-string-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/safe-to-string-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/safe-to-string-x.svg"
alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/safe-to-string-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/safe-to-string-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/safe-to-string-x" title="npm version">
<img src="https://badge.fury.io/js/safe-to-string-x.svg"
alt="npm version" height="18">
</a>

ES6 safeToString module. Converts a `Symbol` literal or object to `Symbol()`
instead of throwing a `TypeError`. Its primary use is for logging/debugging.

**Version**: 1.1.1  
**Author:** Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_safe-to-string-x--module.exports"></a>
### `module.exports(value)` ⇒ <code>string</code> ⏏
The abstract operation `safeToString` converts a `Symbol` literal or
object to `Symbol()` instead of throwing a `TypeError`.

**Kind**: Exported function  
**Returns**: <code>string</code> - The converted value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to convert to a string. |

**Example**  
```js
var safeToString = require('safe-to-string-x');

safeToString(); // 'undefined'
safeToString(null); // 'null'
safeToString('abc'); // 'abc'
safeToString(true); // 'true'
safeToString(Symbol('foo')); // 'Symbol(foo)'
safeToString(Symbol.iterator); // 'Symbol(Symbol.iterator)'
safeToString(Object(Symbol.iterator)); // 'Symbol(Symbol.iterator)'
```
