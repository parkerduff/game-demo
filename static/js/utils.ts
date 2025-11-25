import { WORLD_SIZE } from './config.ts';

interface Position {
    x: number;
    y: number;
}

interface EntityWithScore extends Position {
    score: number;
}

interface GameStateForSpawn {
    aiPlayers: EntityWithScore[];
    playerCells: EntityWithScore[];
}

export function getSize(score: number): number {
    return Math.sqrt(score) + 20;
}

export function getRandomPosition(): Position {
    return {
        x: Math.random() * WORLD_SIZE,
        y: Math.random() * WORLD_SIZE
    };
}

export function getDistance(obj1: Position, obj2: Position): number {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function calculateCenterOfMass(cells: Array<{x: number, y: number, score: number}>): Position {
    const totalScore = cells.reduce((sum: number, cell) => sum + cell.score, 0);
    if (totalScore === 0) return { x: 0, y: 0 };
    
    return {
        x: cells.reduce((sum: number, cell) => sum + cell.x * cell.score, 0) / totalScore,
        y: cells.reduce((sum: number, cell) => sum + cell.y * cell.score, 0) / totalScore
    };
}

export function findSafeSpawnLocation(gameState: GameStateForSpawn, minDistance: number = 100): Position {
    const maxAttempts: number = 50;
    let attempts: number = 0;
    
    while (attempts < maxAttempts) {
        const pos = getRandomPosition();
        let isSafe: boolean = true;

        // Check distance from AI players
        for (const ai of gameState.aiPlayers) {
            const distance = getDistance(pos, ai);
            const safeDistance = getSize(ai.score) + minDistance;
            if (distance < safeDistance) {
                isSafe = false;
                break;
            }
        }

        // Check distance from player cells
        for (const cell of gameState.playerCells) {
            const distance = getDistance(pos, cell);
            const safeDistance = getSize(cell.score) + minDistance;
            if (distance < safeDistance) {
                isSafe = false;
                break;
            }
        }

        if (isSafe) {
            return pos;
        }

        attempts++;
    }

    // If no safe spot found after max attempts, find the spot furthest from all players
    let bestPos = getRandomPosition();
    let maxMinDistance: number = 0;

    for (let i = 0; i < 20; i++) {
        const pos = getRandomPosition();
        let minDistanceToPlayer: number = Infinity;

        // Check distance to all players and cells
        [...gameState.aiPlayers, ...gameState.playerCells].forEach((entity: EntityWithScore) => {
            const distance = getDistance(pos, entity);
            minDistanceToPlayer = Math.min(minDistanceToPlayer, distance);
        });

        if (minDistanceToPlayer > maxMinDistance) {
            maxMinDistance = minDistanceToPlayer;
            bestPos = pos;
        }
    }

    return bestPos;
}
