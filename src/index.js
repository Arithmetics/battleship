import { GameBoard } from './gameBoard.js';
import { Ship } from './ship.js';

const bs = new Ship("Battleship", 4);

const gameBoard = new GameBoard(10);
gameBoard.addShip({x:0,y:0}, "horizontal", bs);

gameBoard.contents.forEach(function(content){
  console.log(content.ship.name);
  content.squares.forEach(function(square){
    console.log(`${square.x}, ${square.y}`);
  })
});

console.log(gameBoard);

console.log(gameBoard.squareTaken({x:0,y:0}))
