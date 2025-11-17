import { WORLD_SIZE, STARTING_SCORE } from './config.js';

export interface PlayerCell {
    x: number;
    y: number;
    score: number;
    velocityX: number;
    velocityY: number;
    splitTime?: number;
}

export interface AIPlayer {
    x: number;
    y: number;
    score: number;
    name: string;
    color: string;
    direction: number;
}

export interface Food {
    x: number;
    y: number;
    color: string;
}

export interface Camera {
    x: number;
    y: number;
}

export interface GameState {
    playerCells: PlayerCell[];
    playerName: string;
    camera: Camera;
    food: Food[];
    aiPlayers: AIPlayer[];
}

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

export interface Mouse {
    x: number;
    y: number;
}

export const mouse: Mouse = { x: 0, y: 0 };
