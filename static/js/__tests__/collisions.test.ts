import { handleFoodCollisions, handlePlayerAICollisions, handleAIAICollisions } from '../collisions.js';
import { gameState } from '../gameState.js';
import { getSize } from '../utils.js';
import type { PlayerCell, AIPlayer, FoodItem } from '../types.js';

jest.mock('../gameState.js', () => ({
  gameState: {
    playerCells: [],
    aiPlayers: [],
    food: []
  }
}));

describe('handleFoodCollisions', () => {
  beforeEach(() => {
    gameState.playerCells = [];
    gameState.food = [];
  });

  test('player cell consumes food when overlapping', () => {
    gameState.playerCells = [{ x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 }];
    gameState.food = [{ x: 100, y: 100, color: 'red' }];

    handleFoodCollisions();

    expect(gameState.food.length).toBe(0);
    expect(gameState.playerCells[0].score).toBe(110);
  });

  test('food remains when not overlapping with player', () => {
    gameState.playerCells = [{ x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 }];
    gameState.food = [{ x: 500, y: 500, color: 'red' }];

    handleFoodCollisions();

    expect(gameState.food.length).toBe(1);
    expect(gameState.playerCells[0].score).toBe(100);
  });
});

describe('handlePlayerAICollisions', () => {
  beforeEach(() => {
    gameState.playerCells = [];
    gameState.aiPlayers = [];
  });

  test('larger player cell consumes AI', () => {
    const playerCell: PlayerCell = { x: 100, y: 100, score: 400, velocityX: 0, velocityY: 0 };
    const ai: AIPlayer = { x: 100, y: 100, score: 100, color: 'blue', direction: 0, name: 'TestAI' };

    gameState.playerCells = [playerCell];
    gameState.aiPlayers = [ai];

    handlePlayerAICollisions();

    expect(gameState.aiPlayers.length).toBe(0);
    expect(gameState.playerCells[0].score).toBe(600);
  });

  test('larger AI consumes player cell', () => {
    const playerCell: PlayerCell = { x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 };
    const ai: AIPlayer = { x: 100, y: 100, score: 400, color: 'blue', direction: 0, name: 'TestAI' };

    gameState.playerCells = [playerCell];
    gameState.aiPlayers = [ai];

    handlePlayerAICollisions();

    expect(gameState.playerCells.length).toBe(1);
    expect(gameState.aiPlayers[0].score).toBe(600);
  });
});

describe('handleAIAICollisions', () => {
  beforeEach(() => {
    gameState.aiPlayers = [];
  });

  test('larger AI consumes smaller AI', () => {
    const ai1: AIPlayer = { x: 100, y: 100, score: 400, color: 'blue', direction: 0, name: 'TestAI1' };
    const ai2: AIPlayer = { x: 100, y: 100, score: 100, color: 'red', direction: 0, name: 'TestAI2' };

    gameState.aiPlayers = [ai1, ai2];

    handleAIAICollisions();

    expect(gameState.aiPlayers.length).toBe(1);
    expect(gameState.aiPlayers[0].score).toBe(600);
  });

  test('equal sized AIs do not consume each other', () => {
    const ai1: AIPlayer = { x: 100, y: 100, score: 100, color: 'blue', direction: 0, name: 'TestAI1' };
    const ai2: AIPlayer = { x: 100, y: 100, score: 100, color: 'red', direction: 0, name: 'TestAI2' };

    gameState.aiPlayers = [ai1, ai2];

    handleAIAICollisions();

    expect(gameState.aiPlayers.length).toBe(2);
    expect(gameState.aiPlayers[0].score).toBe(100);
    expect(gameState.aiPlayers[1].score).toBe(100);
  });
});
