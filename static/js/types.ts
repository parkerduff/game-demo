export interface PlayerCell {
  x: number;
  y: number;
  score: number;
  velocityX: number;
  velocityY: number;
  splitTime?: number;
}

export interface GameState {
  playerCells: PlayerCell[];
  playerName: string;
  camera: { x: number; y: number };
  food: Array<{ x: number; y: number; color: string }>;
  aiPlayers: Array<{ x: number; y: number; score: number; name: string; color: string; direction: number }>;
}

export interface Mouse {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface DOMElements {
  gameCanvas: HTMLCanvasElement;
  minimapCanvas: HTMLCanvasElement;
  scoreElement: HTMLElement;
  leaderboardContent: HTMLElement;
}
