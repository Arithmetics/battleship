import { GameBoard } from "./gameBoard.js";


class Player {
  constructor(type){
    this.type = type;
    this.gameBoard = new GameBoard(10);
  }

  sendAttack(square,anotherPlayer){
    anotherPlayer.gameBoard.receiveAttack(square);
  }

  sendRandomAttack(anotherPlayer){
    let nonGuessed = anotherPlayer.gameBoard.generateNonGuessedSquares();
    let randomLegalSquare = nonGuessed[Math.floor(Math.random()*nonGuessed.length)];
    anotherPlayer.gameBoard.receiveAttack(randomLegalSquare);
  }

}

export { Player }
