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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ship_js__ = __webpack_require__(2);



const player1 = new __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* Player */]("human");
const player2 = new __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* Player */]("computer");

const battleship = new __WEBPACK_IMPORTED_MODULE_1__ship_js__["a" /* Ship */]('battleship', 4);
const cruiser = new __WEBPACK_IMPORTED_MODULE_1__ship_js__["a" /* Ship */]('cruiser', 3);
const destroyer = new __WEBPACK_IMPORTED_MODULE_1__ship_js__["a" /* Ship */]('destroyer', 3);
const patroller = new __WEBPACK_IMPORTED_MODULE_1__ship_js__["a" /* Ship */]('patroller', 2);

player2.gameBoard.addShip({x:0,y:0}, "horizontal",battleship);
player2.gameBoard.addShip({x:3,y:3}, "vertical", cruiser);
player2.gameBoard.addShip({x:6,y:0}, "horizontal", destroyer);
player2.gameBoard.addShip({x:0,y:8}, "vertical", patroller);


function drawPlayersBoard(gameBoard){
  const playerBoard = document.getElementById('playergrid')
  const dimension = gameBoard.size;
  for(let i=0;i<dimension;i++){
    let row = document.createElement('div');
    row.classList.add('row');
    row.dataset.id = i;
    for(let j=0;j<dimension;j++){
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.id = j;
      row.appendChild(cell);
    }
    playerBoard.appendChild(row);
  }

}

drawPlayersBoard(player1.gameBoard);


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
    this.inSquares = [];
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
    this.hits = [];
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
      occupiedSquares.forEach(function(occupiedSquare){
        ship.inSquares.push(occupiedSquare);
      })
      this.contents.push({squares: occupiedSquares, ship: ship});
      return true;
    }
    return false;
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
      this.hits.push(square);
    } else {
      this.misses.push(square);
    }
  }

  hitShipInSquare(square){
    this.contents.forEach(function(content){
      content.squares.forEach(function(insideSquare){
        if (insideSquare.x == square.x && insideSquare.y == square.y) {
          for(let i=0;i<content.ship.hitBox.length;i++){
            if(content.ship.inSquares[i].x == insideSquare.x &&
               content.ship.inSquares[i].y == insideSquare.y) {
                 content.ship.hitBox[i] = true;
               }
          }
        }
      })
    })
  }

  allShipsSunk(){
    let allSunk = true;
    this.contents.forEach(function(content){
      if(!content.ship.isSunk()){
        allSunk = false;
      }
    })
    return allSunk;
  }

  generateNonGuessedSquares(){
    let nonGuessed = [];
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        let potentialSquare = {x:i,y:j};
        if(!this.hits.find(function(square){return (square.x == i && square.y == j);}) &&
         !this.misses.find(function(square){return (square.x == i && square.y == j);})){
          nonGuessed.push(potentialSquare);
        }
      }
    }
    return nonGuessed;
  }


}






/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Player; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gameBoard_js__ = __webpack_require__(3);



class Player {
  constructor(type){
    this.type = type;
    this.gameBoard = new __WEBPACK_IMPORTED_MODULE_0__gameBoard_js__["a" /* GameBoard */](10);
  }

  sendAttack(square,anotherPlayer){
    anotherPlayer.gameBoard.receiveAttack(square);
  }

  sendRandomAttack(anotherPlayer){
    let nonGuessed = anotherPlayer.gameBoard.generateNonGuessedSquares();
    let randomLegalSquare = nonGuessed[Math.floor(Math.random()*nonGuessed.length)];
    console.log(randomLegalSquare)
    anotherPlayer.gameBoard.receiveAttack(randomLegalSquare);
  }

}




/***/ })
/******/ ]);