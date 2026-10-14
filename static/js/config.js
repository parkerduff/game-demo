export const WORLD_SIZE = 8000;
export const FOOD_SIZE = 5;
export const STARTING_SCORE = 100;
export const AI_STARTING_SCORE = 50;  // Starting score for AI players
export const FOOD_SCORE = 10;
export const FOOD_COUNT = 100;
export const AI_COUNT = 10;
export const COLLISION_THRESHOLD = 1.1; // 10% size difference needed for consumption

// Split mechanics
export const MIN_SPLIT_SCORE = 40;  // Minimum score needed to split
export const SPLIT_VELOCITY = 12;   // Initial velocity of split cells
export const MAX_PLAYER_CELLS = 16; // Maximum number of cells a player can have
export const SPLIT_COOLDOWN = 5000; // Milliseconds before cells can merge back
export const MERGE_DISTANCE = 2;    // Distance threshold for merging cells

// Merge mechanics
export const MERGE_COOLDOWN = 10000;  // Time in ms before cells can merge
export const MERGE_FORCE = 0.3;       // Strength of the merging force
export const MERGE_START_FORCE = 0.1; // Initial attraction force (before merge cooldown)

// Okabe-Ito colorblind-safe palette
export const COLORS = {
    PLAYER: '#0072B2',
    CELL_OUTLINE: '#000000',
    ENTITY_PALETTE: ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#D55E00', '#CC79A7'],
    MINIMAP: {
        PLAYER: '#56B4E9',
        TOP_PLAYER: '#F0E442',
        OTHER: 'rgba(255, 255, 255, 0.6)'
    }
};