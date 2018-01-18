import { Ship } from "./ship.js"

it('constructs a new ship object', () => {
  const battleship = new Ship('battleship', 4);
  expect(battleship.constructor.name).toBe("Ship");
})

it('hits correct portion of ship', () => {
  const battleship = new Ship('battleship', 4);
  expect(battleship.hitBox[2]).toBe(false);
  battleship.hit(2);
  expect(battleship.hitBox[2]).toBe(true);
})

it('sinks when all segments are hit', () => {
  const battleship = new Ship('battleship', 4);
  expect(battleship.isSunk()).toBe(false);
  battleship.hit(0);
  expect(battleship.isSunk()).toBe(false);
  battleship.hit(3);
  expect(battleship.isSunk()).toBe(false);
  battleship.hit(1);
  expect(battleship.isSunk()).toBe(false);
  battleship.hit(2);
  expect(battleship.isSunk()).toBe(true);
})
