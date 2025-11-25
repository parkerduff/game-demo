export const WORLD_SIZE: number = 2000;
export const FOOD_SIZE: number = 5;
export const STARTING_SCORE: number = 100;
export const AI_STARTING_SCORE: number = 50;  // Starting score for AI players
export const FOOD_SCORE: number = 10;
export const FOOD_COUNT: number = 100;
export const AI_COUNT: number = 10;
export const COLLISION_THRESHOLD: number = 1.1; // 10% size difference needed for consumption

// Split mechanics
export const MIN_SPLIT_SCORE: number = 40;  // Minimum score needed to split
export const SPLIT_VELOCITY: number = 12;   // Initial velocity of split cells
export const MAX_PLAYER_CELLS: number = 16; // Maximum number of cells a player can have
export const SPLIT_COOLDOWN: number = 5000; // Milliseconds before cells can merge back
export const MERGE_DISTANCE: number = 2;    // Distance threshold for merging cells

// Merge mechanics
export const MERGE_COOLDOWN: number = 10000;  // Time in ms before cells can merge
export const MERGE_FORCE: number = 0.3;       // Strength of the merging force
export const MERGE_START_FORCE: number = 0.1; // Initial attraction force (before merge cooldown)

interface MinimapColors {
    PLAYER: string;
    TOP_PLAYER: string;
    OTHER: string;
}

interface Colors {
    PLAYER: string;
    MINIMAP: MinimapColors;
}

export const COLORS: Colors = {
    PLAYER: '#008080',  // Teal color
    MINIMAP: {
        PLAYER: '#4CAF50',
        TOP_PLAYER: '#FFC107',
        OTHER: 'rgba(255, 255, 255, 0.3)'
    }
};
