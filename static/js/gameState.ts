import { WORLD_SIZE, STARTING_SCORE } from './config.ts';

interface Cell {
    x: number;
    y: number;
    score: number;
    velocityX: number;
    velocityY: number;
    splitTime: number;
}

interface AIPlayer {
    x: number;
    y: number;
    score: number;
    color: string;
    direction: number;
    name: string;
}

interface Food {
    x: number;
    y: number;
    color: string;
}

interface Camera {
    x: number;
    y: number;
}

interface GameState {
    playerCells: Cell[];
    playerName: string;
    camera: Camera;
    food: Food[];
    aiPlayers: AIPlayer[];
}

interface Mouse {
    x: number;
    y: number;
}

export const gameState: GameState = {
    playerCells: [{
        x: WORLD_SIZE / 2,
        y: WORLD_SIZE / 2,
        score: STARTING_SCORE,
        velocityX: 0,
        velocityY: 0,
        splitTime: 0
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
