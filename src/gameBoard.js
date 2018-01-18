import { Ship } from './ship.js'

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



export { GameBoard };
