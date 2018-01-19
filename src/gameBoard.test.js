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

  it('places ships randomly', () => {
    const gameBoard = new GameBoard(10);
    const a = new Ship('battleship', 4);
    const b = new Ship('battleship', 4);
    const c = new Ship('cruiser', 3);
    const d = new Ship('cruiser', 3);
    const ships = [a,b,c,d];
    expect(gameBoard.contents.length).toBe(0);
    gameBoard.placeShipsRandomly(ships);
    expect(gameBoard.contents.length).toBe(4);
  })



})

describe('hits and misses', () => {

  it('records a hit correctly', () => {
    const gameBoard = new GameBoard(10);
    const destroyer = new Ship('destroyer', 3);
    gameBoard.addShip({x:0,y:0},"horizontal", destroyer);
    gameBoard.receiveAttack({x:2,y:0});
    expect(gameBoard.contents[0].ship.hitBox[2]).toBe(true);
    expect(gameBoard.misses.length).toBe(0);
  })

  it('records a miss correctly', () => {
    const gameBoard = new GameBoard(10);
    const destroyer = new Ship('destroyer', 3);
    gameBoard.addShip({x:0,y:0},"horizontal", destroyer);
    gameBoard.receiveAttack({x:0,y:1});
    expect(gameBoard.contents[0].ship.hitBox[0]).toBe(false);
    expect(gameBoard.misses.length).toBe(1);
  })

  it("doesn't report all ships sunk when ships are left", () => {
    const gameBoard = new GameBoard(10);
    const destroyer = new Ship('destroyer', 3);
    const patroller = new Ship('patroller', 2);
    gameBoard.addShip({x:0,y:0}, "horizontal", destroyer);
    gameBoard.addShip({x:0,y:2}, "vertical", patroller);
    expect(gameBoard.allShipsSunk()).toBe(false);
    gameBoard.receiveAttack({x:0,y:0});
    gameBoard.receiveAttack({x:1,y:0});
    gameBoard.receiveAttack({x:2,y:0});
    expect(gameBoard.contents[0].ship.isSunk()).toBe(true);
    expect(gameBoard.contents[1].ship.isSunk()).toBe(false);
    expect(gameBoard.allShipsSunk()).toBe(false);
  })

  it("reports all ships sunk, when all ships have been sunk :) ", () => {
    const gameBoard = new GameBoard(10);
    const b = new Ship('battleship', 4);
    const c = new Ship('cruiser', 3);
    const d = new Ship('destroyer', 3);
    const a = new Ship('patroller', 2);
    gameBoard.addShip({x:3,y:4}, "horizontal",b);
    gameBoard.addShip({x:6,y:0}, "vertical", c);
    gameBoard.addShip({x:0,y:9}, "horizontal", d);
    gameBoard.addShip({x:5,y:6}, "vertical", a);
    expect(gameBoard.allShipsSunk()).toBe(false);
    gameBoard.receiveAttack({x:3,y:4});
    gameBoard.receiveAttack({x:4,y:4});
    gameBoard.receiveAttack({x:5,y:4});
    gameBoard.receiveAttack({x:6,y:4});

    gameBoard.receiveAttack({x:6,y:0});
    gameBoard.receiveAttack({x:6,y:1});
    gameBoard.receiveAttack({x:6,y:2});

    gameBoard.receiveAttack({x:0,y:9});
    gameBoard.receiveAttack({x:1,y:9});
    gameBoard.receiveAttack({x:2,y:9});

    gameBoard.receiveAttack({x:5,y:6});
    gameBoard.receiveAttack({x:5,y:7});

    expect(gameBoard.allShipsSunk()).toBe(true);
  })

})
