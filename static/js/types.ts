export interface Position {
    x: number;
    y: number;
}

export interface Cell {
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
    color: string;
    direction: number;
    name: string;
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
    playerCells: Cell[];
    playerName: string;
    camera: Camera;
    food: Food[];
    aiPlayers: AIPlayer[];
}

export interface Mouse {
    x: number;
    y: number;
}

export interface CanvasElements {
    gameCanvas: HTMLCanvasElement;
    minimapCanvas: HTMLCanvasElement;
    scoreElement: HTMLElement;
    leaderboardContent: HTMLElement;
}

export interface ColorsConfig {
    PLAYER: string;
    MINIMAP: {
        PLAYER: string;
        TOP_PLAYER: string;
        OTHER: string;
    };
}
