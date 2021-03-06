import { Player } from './player.js';
import { Ship } from './ship.js';
import { GameBoard } from './gameBoard.js'

const player1 = new Player("human");
const player2 = new Player("computer");

function initGame(){

  player1.gameBoard = new GameBoard(10);
  player2.gameBoard = new GameBoard(10);

  const playerShips = [new Ship('battleship', 4),
                 new Ship('cruiser', 3),
                 new Ship('destroyer', 3),
                 new Ship('patroller', 2)];

  const computerShips = [new Ship('battleship', 4),
                 new Ship('cruiser', 3),
                 new Ship('destroyer', 3),
                 new Ship('patroller', 2)];

  player2.gameBoard.placeShipsRandomly(computerShips);

  player1.gameBoard.placeShipsRandomly(playerShips);

}

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

function drawOpponentsBoard(gameBoard){
  const opponentBoard = document.getElementById('opponentgrid')
  const dimension = gameBoard.size;
  for(let i=0;i<dimension;i++){
    let row = document.createElement('div');
    row.classList.add('row');
    row.dataset.id = i;
    for(let j=0;j<dimension;j++){
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.id = j;
      addAttackListener(cell, gameBoard);
      row.appendChild(cell);
    }
    opponentBoard.appendChild(row);
  }
  addMisses('opponentgrid', gameBoard);
}

function addMisses(domgameBoardID, gameBoard){
  const board = document.getElementById(domgameBoardID);
  gameBoard.misses.forEach(function(miss){
    const row = board.querySelectorAll('.row')[miss.x];
    const cell = row.querySelectorAll('.cell')[miss.y];
    cell.classList.add('miss');
  })
}

function addHits(domgameBoardID, gameBoard){
  const board = document.getElementById(domgameBoardID);
  gameBoard.hits.forEach(function(hit){
    const row = board.querySelectorAll('.row')[hit.x];
    const cell = row.querySelectorAll('.cell')[hit.y];
    cell.classList.add('hit');
  })
}

function drawShips(domgameBoardID, gameBoard){
  const board = document.getElementById(domgameBoardID);
  gameBoard.contents.forEach(function(content){
    if (content.squares[0].x == content.squares[1].x) { //ship is horizontal
      content.squares.forEach(function(part){
        const row = board.querySelectorAll('.row')[part.x];
        const cell = row.querySelectorAll('.cell')[part.y];
        cell.classList.add('horizontalship');
      })
    } else { //ship is vertical
      content.squares.forEach(function(part){
        const row = board.querySelectorAll('.row')[part.x];
        const cell = row.querySelectorAll('.cell')[part.y];
        cell.classList.add('verticalship');
      })
    }
  })
}

function addAttackListener(cell, gameBoard){
  cell.addEventListener("click", function attack(e){
    let y = e.target.dataset.id;
    let x = e.target.parentNode.dataset.id;
    gameBoard.receiveAttack({x:x,y:y});
    addMisses('opponentgrid', gameBoard);
    addHits('opponentgrid', gameBoard);
    cell.removeEventListener("click", attack);
    if (gameBoard.allShipsSunk()){
      return gameEnd("You Win!");
      console.log("computer player all ships sunk");
    }
    computerAttack(player2, player1);
  })
}

function computerAttack(computerPlayer, humanPlayer){
  computerPlayer.sendRandomAttack(humanPlayer);
  addMisses('playergrid',humanPlayer.gameBoard);
  addHits('playergrid', humanPlayer.gameBoard);
  if (humanPlayer.gameBoard.allShipsSunk()){
    console.log("humanPlayer all ships sunk");
    return gameEnd("Computer Wins!");
  }
}

function gameEnd(message){
  const result = document.getElementById('result');
  result.textContent = message;
  const playerBoard = document.getElementById('playergrid')
  const opponentBoard = document.getElementById('opponentgrid')
  playerBoard.innerHTML = '';
  opponentBoard.innerHTML = '';
  initGame();
  drawPlayersBoard(player1.gameBoard);
  drawOpponentsBoard(player2.gameBoard);
}

initGame();
drawPlayersBoard(player1.gameBoard);
drawOpponentsBoard(player2.gameBoard);

drawShips('playergrid',player1.gameBoard);
