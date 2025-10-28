import { WORLD_SIZE, STARTING_SCORE } from './config.js';
import type { GameState, Mouse } from './types.js';

export const gameState: GameState = {
    playerCells: [{
        x: WORLD_SIZE / 2,
        y: WORLD_SIZE / 2,
        score: STARTING_SCORE,
        velocityX: 0,
        velocityY: 0
    }],
    playerName: 'Windsurf',
    camera: {
        x: 0,
        y: 0
    },
    food: [],
    aiPlayers: []
};

export const mouse: Mouse = { x: 0, y: 0 };
