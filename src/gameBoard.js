import { Ship } from './ship.js'

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
      console.log(occupiedSquares);
      occupiedSquares.forEach(function(occupiedSquare){
        ship.inSquares.push(occupiedSquare);
      })
      this.contents.push({squares: occupiedSquares, ship: ship});
      return true;
    }
    return false;
  }

  placeShipsRandomly(shipsArr){
    const ships = shipsArr;
    const gameBoard = this;
    const orientations = ["horizontal","vertical"];
    const xLocations = [0,1,2,3,4,5,6,7,8];
    const yLocations = [0,1,2,3,4,5,6,7,8];
    ships.forEach(function(ship){
      let added = false;
      let randomOrientation = orientations[Math.floor(Math.random()*orientations.length)];
      let randomXLocation = xLocations[Math.floor(Math.random()*xLocations.length)];
      let randomYLocation = xLocations[Math.floor(Math.random()*yLocations.length)];
      while (added == false){
        if (gameBoard.addShip({x:randomXLocation,y:randomYLocation},randomOrientation,ship)){
          added = true;
        } else {
            randomOrientation = orientations[Math.floor(Math.random()*orientations.length)];
            randomXLocation = xLocations[Math.floor(Math.random()*xLocations.length)];
            randomYLocation = yLocations[Math.floor(Math.random()*yLocations.length)];
        }
      }
    })
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



export { GameBoard };
