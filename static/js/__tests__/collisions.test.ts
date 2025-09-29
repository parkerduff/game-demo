import { handleFoodCollisions, handlePlayerAICollisions, handleAIAICollisions } from '../collisions.js';
import { gameState } from '../gameState.js';
import { getSize } from '../utils.js';
import { GameState } from '../types.js';

jest.mock('../gameState.js', () => ({
  gameState: {
    playerCells: [],
    aiPlayers: [],
    food: []
  }
}));

const mockedGameState = gameState as GameState;

describe('handleFoodCollisions', () => {
  beforeEach(() => {
    mockedGameState.playerCells = [];
    mockedGameState.food = [];
  });

  test('player cell consumes food when overlapping', () => {
    mockedGameState.playerCells = [{ x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 }];
    mockedGameState.food = [{ x: 100, y: 100, color: 'red' }];

    handleFoodCollisions();

    expect(mockedGameState.food.length).toBe(0);
    expect(mockedGameState.playerCells[0].score).toBe(110);
  });

  test('food remains when not overlapping with player', () => {
    mockedGameState.playerCells = [{ x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 }];
    mockedGameState.food = [{ x: 500, y: 500, color: 'red' }];

    handleFoodCollisions();

    expect(mockedGameState.food.length).toBe(1);
    expect(mockedGameState.playerCells[0].score).toBe(100);
  });
});

describe('handlePlayerAICollisions', () => {
  beforeEach(() => {
    mockedGameState.playerCells = [];
    mockedGameState.aiPlayers = [];
  });

  test('larger player cell consumes AI', () => {
    const playerCell = { x: 100, y: 100, score: 400, velocityX: 0, velocityY: 0 };
    const ai = { x: 100, y: 100, score: 100, color: 'blue', direction: 0, name: 'TestAI' };

    mockedGameState.playerCells = [playerCell];
    mockedGameState.aiPlayers = [ai];

    handlePlayerAICollisions();

    expect(mockedGameState.aiPlayers.length).toBe(0);
    expect(mockedGameState.playerCells[0].score).toBe(600);
  });

  test('larger AI consumes player cell', () => {
    const playerCell = { x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 };
    const ai = { x: 100, y: 100, score: 400, color: 'blue', direction: 0, name: 'TestAI' };

    mockedGameState.playerCells = [playerCell];
    mockedGameState.aiPlayers = [ai];

    handlePlayerAICollisions();

    expect(mockedGameState.playerCells.length).toBe(1);
    expect(mockedGameState.aiPlayers[0].score).toBe(600);
  });
});

describe('handleAIAICollisions', () => {
  beforeEach(() => {
    mockedGameState.aiPlayers = [];
  });

  test('larger AI consumes smaller AI', () => {
    const ai1 = { x: 100, y: 100, score: 400, color: 'blue', direction: 0, name: 'AI1' };
    const ai2 = { x: 100, y: 100, score: 100, color: 'red', direction: 0, name: 'AI2' };

    mockedGameState.aiPlayers = [ai1, ai2];

    handleAIAICollisions();

    expect(mockedGameState.aiPlayers.length).toBe(1);
    expect(mockedGameState.aiPlayers[0].score).toBe(600);
  });

  test('equal sized AIs do not consume each other', () => {
    const ai1 = { x: 100, y: 100, score: 100, color: 'blue', direction: 0, name: 'AI1' };
    const ai2 = { x: 100, y: 100, score: 100, color: 'red', direction: 0, name: 'AI2' };

    mockedGameState.aiPlayers = [ai1, ai2];

    handleAIAICollisions();

    expect(mockedGameState.aiPlayers.length).toBe(2);
    expect(mockedGameState.aiPlayers[0].score).toBe(100);
    expect(mockedGameState.aiPlayers[1].score).toBe(100);
  });
});
