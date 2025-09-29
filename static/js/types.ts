export interface Position {
  x: number;
  y: number;
}

export interface Cell extends Position {
  score: number;
  velocityX: number;
  velocityY: number;
  splitTime?: number;
}

export interface AIPlayer extends Position {
  score: number;
  color: string;
  direction: number;
  name: string;
}

export interface Food extends Position {
  color: string;
}

export interface Camera extends Position {}

export interface GameState {
  playerCells: Cell[];
  aiPlayers: AIPlayer[];
  food: Food[];
  camera: Camera;
  playerName: string;
}

export interface Mouse extends Position {}

export interface CanvasElements {
  gameCanvas: HTMLCanvasElement;
  minimapCanvas: HTMLCanvasElement;
  scoreElement: HTMLElement;
  leaderboardContent: HTMLElement;
}

export interface LeaderboardPlayer {
  name: string;
  score: number;
  isPlayer: boolean;
}
