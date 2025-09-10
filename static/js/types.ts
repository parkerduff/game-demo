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

export interface GameState {
  playerCells: PlayerCell[];
  aiPlayers: AIPlayer[];
  food: FoodItem[];
  playerName: string;
  camera: { x: number; y: number };
}

export interface Mouse {
  x: number;
  y: number;
}
