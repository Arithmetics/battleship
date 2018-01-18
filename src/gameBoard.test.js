import { GameBoard } from './gameBoard.js';
import { Ship } from './ship.js'


const battleship = new Ship('battleship', 4);
const cruiser = new Ship('cruiser', 3);

describe('ship placement', () => {

  it('places a valid horizontal ship', () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.contents.length).toBe(0);
    gameBoard.addShip({x:0,y:0},"horizontal", battleship);
    expect(gameBoard.contents.length).toBe(1);
  })

  it('places a valid vertical ship', () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.contents.length).toBe(0);
    gameBoard.addShip({x:0,y:0},"vertical", battleship);
    expect(gameBoard.contents.length).toBe(1);
  })

  it('will not place a horizontal ship out of bounds', () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.contents.length).toBe(0);
    gameBoard.addShip({x:7,y:0},"horizontal", battleship);
    expect(gameBoard.contents.length).toBe(0);
  })

  it('will not place a vertical ship out of bounds', () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.contents.length).toBe(0);
    gameBoard.addShip({x:0,y:7},"vertical", battleship);
    expect(gameBoard.contents.length).toBe(0);
  })

  it('will not place a horizontal ship on top of another ship', () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.contents.length).toBe(0);
    gameBoard.addShip({x:0,y:0},"horizontal", battleship);
    expect(gameBoard.contents.length).toBe(1);
    gameBoard.addShip({x:3,y:0},"horizontal", cruiser);
    expect(gameBoard.contents.length).toBe(1);
  })

  it('will not place a vertical ship on top of another ship', () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.contents.length).toBe(0);
    gameBoard.addShip({x:0,y:0},"horizontal", battleship);
    expect(gameBoard.contents.length).toBe(1);
    gameBoard.addShip({x:2,y:0},"vertical", cruiser);
    expect(gameBoard.contents.length).toBe(1);
  })

})
