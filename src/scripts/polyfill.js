//@ts-check
/// <reference path="./index.d.ts" />

// ============
// polyfill

// for promise and for-of
require("core-js/fn/promise");
require("core-js/fn/symbol");

// for string methods
require("core-js/fn/string/starts-with");
require("core-js/fn/string/ends-with");
require("core-js/fn/string/trim");

// for react
require("core-js/fn/map");
require("core-js/fn/set");
// Warning: React depends on requestAnimationFrame. 
// Make sure that you load a polyfill in older browsers.http://fb.me/react-polyfills
require('raf'); //RequestAnimationFrame
