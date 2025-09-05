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
  color: string;
  direction: number;
  name: string;
}

export interface FoodItem {
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
  food: FoodItem[];
  aiPlayers: AIPlayer[];
}

export interface GameElements {
  gameCanvas: HTMLCanvasElement;
  minimapCanvas: HTMLCanvasElement;
  scoreElement: HTMLElement;
  leaderboardContent: HTMLElement;
}

export interface Mouse {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ColorsConfig {
  PLAYER: string;
  MINIMAP: {
    PLAYER: string;
    TOP_PLAYER: string;
    OTHER: string;
  };
}
