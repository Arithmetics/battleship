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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameBoard_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ship_js__ = __webpack_require__(2);



const bs = new __WEBPACK_IMPORTED_MODULE_1__ship_js__["a" /* Ship */]("Battleship", 4);

const gameBoard = new __WEBPACK_IMPORTED_MODULE_0__gameBoard_js__["a" /* GameBoard */](10);
gameBoard.addShip({x:0,y:0}, "horizontal", bs);

gameBoard.contents.forEach(function(content){
  console.log(content.ship.name);
  content.squares.forEach(function(square){
    console.log(`${square.x}, ${square.y}`);
  })
});

console.log(gameBoard);

console.log(gameBoard.squareTaken({x:0,y:0}))


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ship; });
class Ship {
  constructor(name,length){
    this.name = name;
    this.length = length;
    let x = [];
    for(let i=0;i<length;i++){
      x.push(false);
    }
    this.hitBox = x;
  }

  hit(position) {
    this.hitBox[position] = true;
  }

  isSunk() {
    return this.hitBox.every(val => {return val == true});
  }
}







/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameBoard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ship_js__ = __webpack_require__(2);


class GameBoard {
  constructor(size) {
    this.contents = [];
    this.size = size;
    this.misses = [];
  }

  addShip(startPostion, orientation, ship){
    let occupiedSquares = [];
    let validPlacement = true;
    let newSquare = {};
    for(let i=0;i<ship.length;i++){
      if (orientation == "horizontal"){
        newSquare = {x:startPostion.x+i,y:startPostion.y};
      } else if (orientation == "vertical"){
        newSquare = {x:startPostion.x,y:startPostion.y+i};
      }
      if (!this.validSquare(newSquare)){
        validPlacement = false;
      }
      occupiedSquares.push(newSquare);
    }
    if (validPlacement){
      this.contents.push({squares: occupiedSquares, ship: ship});
    }
  }

  squareTaken(square){
    let taken = false;
    this.contents.forEach(function(content){
      content.squares.forEach(function(insideSquare){
        if (insideSquare.x == square.x && insideSquare.y == square.y) {
          taken = true;
        }
      })
    })
    return taken;
  }

  squareOutsideBoundary(square){
    let outside = false;
    if (square.x >= this.size) {
      outside = true;
    } else if (square.x < 0) {
      outside = true;
    } else if (square.y >= this.size) {
      outside = true;
    } else if (square.y < 0) {
      outside = true;
    }
    return outside;
  }

  validSquare(square){
    if (!this.squareOutsideBoundary(square) && !this.squareTaken(square)){
      return true;
    } else {
      return false;
    }
  }

  receiveAttack(square){
    if (this.squareTaken(square)){
      this.hitShipInSquare(square);
    } else {
      this.misses.push(square);
    }
  }

  hitShipInSquare(square){
    this.contents.forEach(function(content){
      content.squares.forEach(function(insideSquare){
        if (insideSquare.x == square.x && insideSquare.y == square.y) {
          content.ship.hit()
        }
      })
    })
  }



}






/***/ })
/******/ ]);