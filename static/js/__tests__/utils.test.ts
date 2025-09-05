import { getSize, getDistance, calculateCenterOfMass } from '../utils.js';
import type { Position, PlayerCell } from '../types.js';

describe('getSize', () => {
  test('returns correct size for score 0', () => {
    expect(getSize(0)).toBe(20);
  });

  test('returns correct size for score 100', () => {
    expect(getSize(100)).toBe(30);
  });

  test('returns correct size for score 400', () => {
    expect(getSize(400)).toBe(40);
  });
});

describe('getDistance', () => {
  test('returns 0 for same point', () => {
    const point: Position = { x: 10, y: 10 };
    expect(getDistance(point, point)).toBe(0);
  });

  test('returns correct horizontal distance', () => {
    const point1: Position = { x: 0, y: 0 };
    const point2: Position = { x: 3, y: 0 };
    expect(getDistance(point1, point2)).toBe(3);
  });

  test('returns correct vertical distance', () => {
    const point1: Position = { x: 0, y: 0 };
    const point2: Position = { x: 0, y: 4 };
    expect(getDistance(point1, point2)).toBe(4);
  });

  test('returns correct diagonal distance', () => {
    const point1: Position = { x: 0, y: 0 };
    const point2: Position = { x: 3, y: 4 };
    expect(getDistance(point1, point2)).toBe(5);
  });
});

describe('calculateCenterOfMass', () => {
  test('returns center for single cell', () => {
    const cells: PlayerCell[] = [{ x: 10, y: 20, score: 100, velocityX: 0, velocityY: 0 }];
    const center = calculateCenterOfMass(cells);
    expect(center).toEqual({ x: 10, y: 20 });
  });

  test('returns weighted center for multiple cells', () => {
    const cells: PlayerCell[] = [
      { x: 0, y: 0, score: 100, velocityX: 0, velocityY: 0 },
      { x: 10, y: 10, score: 300, velocityX: 0, velocityY: 0 }
    ];
    const center = calculateCenterOfMass(cells);
    expect(center.x).toBeCloseTo(7.5);
    expect(center.y).toBeCloseTo(7.5);
  });

  test('returns {x: 0, y: 0} for empty cells array', () => {
    expect(calculateCenterOfMass([])).toEqual({ x: 0, y: 0 });
  });

  test('returns {x: 0, y: 0} for cells with zero total score', () => {
    const cells: PlayerCell[] = [
      { x: 10, y: 20, score: 0, velocityX: 0, velocityY: 0 },
      { x: 30, y: 40, score: 0, velocityX: 0, velocityY: 0 }
    ];
    expect(calculateCenterOfMass(cells)).toEqual({ x: 0, y: 0 });
  });
});
