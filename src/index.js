import { Player } from './player.js';
import { Ship } from './ship.js';

const player1 = new Player("human");
const player2 = new Player("computer");

const battleship = new Ship('battleship', 4);
const cruiser = new Ship('cruiser', 3);
const destroyer = new Ship('destroyer', 3);
const patroller = new Ship('patroller', 2);

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
