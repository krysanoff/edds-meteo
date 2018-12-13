/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(12);
module.exports = __webpack_require__(43);


/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: D:\\Sites\\new-laravel\\resources\\js\\index.js: Unexpected token (8:16)\n\n\u001b[0m \u001b[90m  6 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m  7 | \u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m  8 | \u001b[39m\u001b[33mReactDOM\u001b[39m\u001b[33m.\u001b[39mrender(\u001b[33m<\u001b[39m\u001b[33mApp\u001b[39m \u001b[33m/\u001b[39m\u001b[33m>\u001b[39m\u001b[33m,\u001b[39m document\u001b[33m.\u001b[39mgetElementById(\u001b[32m'root'\u001b[39m))\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m  9 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 10 | \u001b[39m\u001b[90m// If you want your app to work offline and load faster, you can change\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 11 | \u001b[39m\u001b[90m// unregister() to register() below. Note this comes with some pitfalls.\u001b[39m\u001b[0m\n    at Parser.raise (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:4028:15)\n    at Parser.unexpected (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5359:16)\n    at Parser.parseExprAtom (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6518:20)\n    at Parser.parseExprSubscripts (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6081:21)\n    at Parser.parseMaybeUnary (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6060:21)\n    at Parser.parseExprOps (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5945:21)\n    at Parser.parseMaybeConditional (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5917:21)\n    at Parser.parseMaybeAssign (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5864:21)\n    at Parser.parseExprListItem (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:7199:18)\n    at Parser.parseCallExpressionArguments (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6289:22)\n    at Parser.parseSubscript (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6191:32)\n    at Parser.parseSubscripts (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6101:19)\n    at Parser.parseExprSubscripts (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6091:17)\n    at Parser.parseMaybeUnary (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:6060:21)\n    at Parser.parseExprOps (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5945:21)\n    at Parser.parseMaybeConditional (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5917:21)\n    at Parser.parseMaybeAssign (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5864:21)\n    at Parser.parseExpression (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:5817:21)\n    at Parser.parseStatementContent (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:7592:21)\n    at Parser.parseStatement (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:7478:17)\n    at Parser.parseBlockOrModuleBlockBody (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:8046:23)\n    at Parser.parseBlockBody (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:8033:10)\n    at Parser.parseTopLevel (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:7443:10)\n    at Parser.parse (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:8876:17)\n    at parse (D:\\Sites\\new-laravel\\node_modules\\@babel\\parser\\lib\\index.js:10907:38)\n    at parser (D:\\Sites\\new-laravel\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:170:34)\n    at normalizeFile (D:\\Sites\\new-laravel\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:138:11)\n    at runSync (D:\\Sites\\new-laravel\\node_modules\\@babel\\core\\lib\\transformation\\index.js:44:43)\n    at runAsync (D:\\Sites\\new-laravel\\node_modules\\@babel\\core\\lib\\transformation\\index.js:35:14)\n    at process.nextTick (D:\\Sites\\new-laravel\\node_modules\\@babel\\core\\lib\\transform.js:34:34)");

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });