import { gameState, mouse } from './gameState.js';
import { initRenderer, resizeCanvas, drawGame, drawMinimap, updateLeaderboard } from './renderer.js';
import { updatePlayer, updateAI, initEntities, handlePlayerSplit } from './entities.js';
import { handleFoodCollisions, handlePlayerAICollisions, handleAIAICollisions, respawnEntities } from './collisions.js';
import { initUI } from './ui.js';
import type { GameElements } from './types.js';

function setupInputHandlers(): void {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    
    if (!canvas) {
        throw new Error('Game canvas not found');
    }
    
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    canvas.addEventListener('click', (e: MouseEvent) => {
        handlePlayerSplit();
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

function checkCollisions(): void {
    handleFoodCollisions();
    handlePlayerAICollisions();
    handleAIAICollisions();
    respawnEntities();
}

function verifyGameState(): void {
    console.log('Verifying game state...');
    console.log('Player cells:', gameState.playerCells);
    console.log('AI players:', gameState.aiPlayers);
    console.log('Food count:', gameState.food.length);

    if (gameState.playerCells.length === 0) {
        console.error('No player cells found!');
    }
    if (gameState.aiPlayers.length === 0) {
        console.error('No AI players found!');
    }
    if (gameState.food.length === 0) {
        console.error('No food found!');
    }
}

function gameLoop(): void {
    updatePlayer();
    updateAI();
    checkCollisions();
    updateLeaderboard();
    drawGame();
    drawMinimap();
    requestAnimationFrame(gameLoop);
}

async function initGame(): Promise<void> {
    try {
        console.log('Initializing game...');
        
        const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        const minimapCanvas = document.getElementById('minimap') as HTMLCanvasElement;
        const scoreElement = document.getElementById('score') as HTMLElement;
        const leaderboardContent = document.getElementById('leaderboard-content') as HTMLElement;

        if (!gameCanvas || !minimapCanvas || !scoreElement || !leaderboardContent) {
            throw new Error('Required DOM elements not found');
        }

        const elements: GameElements = {
            gameCanvas,
            minimapCanvas,
            scoreElement,
            leaderboardContent
        };

        console.log('DOM elements found');

        initRenderer(elements);
        console.log('Renderer initialized');
        
        setupInputHandlers();
        console.log('Input handlers set up');
        
        initEntities();
        console.log('Entities initialized');

        initUI();
        console.log('UI initialized');

        verifyGameState();

        console.log('Starting game loop');
        gameLoop();
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

// Start the game when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
