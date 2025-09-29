import { splitPlayerCell, handlePlayerSplit, updatePlayer } from '../entities.js';
import { gameState, mouse } from '../gameState.js';
import { MIN_SPLIT_SCORE, MAX_PLAYER_CELLS } from '../config.js';
import { GameState, Mouse } from '../types.js';

jest.mock('../gameState.js', () => ({
  gameState: {
    playerCells: []
  },
  mouse: { x: 0, y: 0 }
}));

const mockedGameState = gameState as GameState;
const mockedMouse = mouse as Mouse;

describe('splitPlayerCell', () => {
  beforeEach(() => {
    mockedGameState.playerCells = [];
  });

  test('does not split cell below minimum score', () => {
    const cell = { x: 100, y: 100, score: MIN_SPLIT_SCORE - 1, velocityX: 0, velocityY: 0 };
    mockedGameState.playerCells = [cell];

    splitPlayerCell(cell);

    expect(mockedGameState.playerCells.length).toBe(1);
    expect(mockedGameState.playerCells[0].score).toBe(MIN_SPLIT_SCORE - 1);
  });

  test('splits cell with sufficient score', () => {
    const cell = { x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 };
    mockedGameState.playerCells = [cell];

    splitPlayerCell(cell);

    expect(mockedGameState.playerCells.length).toBe(2);
    expect(mockedGameState.playerCells[0].score).toBe(50);
    expect(mockedGameState.playerCells[1].score).toBe(50);
  });

  test('does not split when at max cells', () => {
    const cell = { x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 };
    mockedGameState.playerCells = Array(MAX_PLAYER_CELLS).fill({ ...cell });

    splitPlayerCell(cell);

    expect(mockedGameState.playerCells.length).toBe(MAX_PLAYER_CELLS);
  });
});

describe('handlePlayerSplit', () => {
  beforeEach(() => {
    mockedGameState.playerCells = [];
  });

  test('splits all eligible cells', () => {
    mockedGameState.playerCells = [
      { x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 },
      { x: 200, y: 200, score: MIN_SPLIT_SCORE - 1, velocityX: 0, velocityY: 0 },
      { x: 300, y: 300, score: 100, velocityX: 0, velocityY: 0 }
    ];

    handlePlayerSplit();

    expect(mockedGameState.playerCells.length).toBe(5);
  });
});

describe('updatePlayer', () => {
  beforeEach(() => {
    mockedGameState.playerCells = [];
    mockedMouse.x = 0;
    mockedMouse.y = 0;
  });

  test('moves player cells towards mouse', () => {
    const cell = { 
      x: 0, 
      y: 0, 
      score: 100, 
      velocityX: 0, 
      velocityY: 0 
    };
    mockedGameState.playerCells = [cell];
    
    mockedMouse.x = 1000;
    mockedMouse.y = 0;
    
    for (let i = 0; i < 5; i++) {
      updatePlayer();
    }

    expect(mockedGameState.playerCells[0].velocityX).toBeGreaterThan(0);
  });

  test('applies speed based on cell size', () => {
    const smallCell = { x: 100, y: 100, score: 100, velocityX: 0, velocityY: 0 };
    const largeCell = { x: 100, y: 100, score: 400, velocityX: 0, velocityY: 0 };

    mockedGameState.playerCells = [smallCell];
    mockedMouse.x = 200;
    updatePlayer();
    const smallCellSpeed = Math.abs(mockedGameState.playerCells[0].velocityX);

    mockedGameState.playerCells = [largeCell];
    mockedMouse.x = 200;
    updatePlayer();
    const largeCellSpeed = Math.abs(mockedGameState.playerCells[0].velocityX);

    expect(smallCellSpeed).toBeGreaterThan(largeCellSpeed);
  });
});
