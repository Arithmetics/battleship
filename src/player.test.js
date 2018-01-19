import { Player } from './player.js';
import { Ship } from './ship.js';

it("records misses correctly", () => {
  const player1 = new Player("human");
  const player2 = new Player("computer");
  player1.sendAttack({x:0,y:0}, player2)
  expect(player2.gameBoard.misses.length).toBe(1);
})

it("records hits correctly", () => {
  const player1 = new Player("human");
  const player2 = new Player("computer");
  const battleship = new Ship('battleship', 4);
  player2.gameBoard.addShip({x:0,y:2}, "horizontal", battleship);
  player1.sendAttack({x:1,y:2}, player2);
  expect(player2.gameBoard.hits.length).toBe(1);
  expect(player2.gameBoard.contents[0].ship.hitBox[1]).toBe(true);
  player1.sendAttack({x:2,y:2}, player2);
  player1.sendAttack({x:0,y:2}, player2);
  player1.sendAttack({x:3,y:2}, player2);
  expect(player2.gameBoard.hits.length).toBe(4);
  expect(player2.gameBoard.contents[0].ship.isSunk()).toBe(true);
})
