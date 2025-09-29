export const WORLD_SIZE: number = 2000;
export const FOOD_SIZE: number = 5;
export const STARTING_SCORE: number = 100;
export const AI_STARTING_SCORE: number = 50;
export const FOOD_SCORE: number = 10;
export const FOOD_COUNT: number = 100;
export const AI_COUNT: number = 10;
export const COLLISION_THRESHOLD: number = 1.1;

export const MIN_SPLIT_SCORE: number = 40;
export const SPLIT_VELOCITY: number = 12;
export const MAX_PLAYER_CELLS: number = 16;
export const SPLIT_COOLDOWN: number = 5000;
export const MERGE_DISTANCE: number = 2;

export const MERGE_COOLDOWN: number = 10000;
export const MERGE_FORCE: number = 0.3;
export const MERGE_START_FORCE: number = 0.1;

export const COLORS: {
  PLAYER: string;
  MINIMAP: {
    PLAYER: string;
    TOP_PLAYER: string;
    OTHER: string;
  };
} = {
  PLAYER: '#008080',
  MINIMAP: {
    PLAYER: '#4CAF50',
    TOP_PLAYER: '#FFC107',
    OTHER: 'rgba(255, 255, 255, 0.3)'
  }
};
