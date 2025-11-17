import { gameState } from './gameState.js';
import { getSize, calculateCenterOfMass } from './utils.js';
import { WORLD_SIZE, COLORS, FOOD_SIZE } from './config.js';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let minimapCanvas: HTMLCanvasElement;
let minimapCtx: CanvasRenderingContext2D;
let scoreElement: HTMLElement;
let leaderboardContent: HTMLElement;

interface CanvasElements {
    gameCanvas: HTMLCanvasElement;
    minimapCanvas: HTMLCanvasElement;
    scoreElement: HTMLElement;
    leaderboardContent: HTMLElement;
}

export function initRenderer(canvasElements: CanvasElements): void {
    canvas = canvasElements.gameCanvas;
    ctx = canvas.getContext('2d')!;
    minimapCanvas = canvasElements.minimapCanvas;
    minimapCtx = minimapCanvas.getContext('2d')!;
    scoreElement = canvasElements.scoreElement;
    leaderboardContent = canvasElements.leaderboardContent;

    resizeCanvas();
}

export function resizeCanvas(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawCircle(x: number, y: number, value: number, color: string, isFood: boolean): void {
    const size = isFood ? value : getSize(value);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCellWithName(x: number, y: number, score: number, color: string, name: string): void {
    const size = getSize(score);
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    if (size > 20) {  // Only draw name if cell is big enough
        ctx.save();
        
        const fontSize = Math.max(12, Math.min(20, size / 2));
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.strokeText(name, x, y);
        ctx.fillText(name, x, y);
        
        ctx.restore();
    }
}

export function drawGame(): void {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerOfMass = calculateCenterOfMass(gameState.playerCells);
    gameState.camera.x = centerOfMass.x - canvas.width / 2;
    gameState.camera.y = centerOfMass.y - canvas.height / 2;

    gameState.food.forEach(food => {
        const screenX = food.x - gameState.camera.x;
        const screenY = food.y - gameState.camera.y;
        
        if (screenX >= -FOOD_SIZE && screenX <= canvas.width + FOOD_SIZE &&
            screenY >= -FOOD_SIZE && screenY <= canvas.height + FOOD_SIZE) {
            drawCircle(screenX, screenY, FOOD_SIZE, food.color, true);
        }
    });

    gameState.aiPlayers.forEach(ai => {
        const screenX = ai.x - gameState.camera.x;
        const screenY = ai.y - gameState.camera.y;
        const size = getSize(ai.score);
        
        if (screenX >= -size && screenX <= canvas.width + size &&
            screenY >= -size && screenY <= canvas.height + size) {
            drawCellWithName(screenX, screenY, ai.score, ai.color, ai.name);
        }
    });

    gameState.playerCells.forEach(cell => {
        const screenX = cell.x - gameState.camera.x;
        const screenY = cell.y - gameState.camera.y;
        const size = getSize(cell.score);
        
        if (screenX >= -size && screenX <= canvas.width + size &&
            screenY >= -size && screenY <= canvas.height + size) {
            drawCellWithName(screenX, screenY, cell.score, COLORS.PLAYER, gameState.playerName);
        }
    });

    scoreElement.textContent = `Score: ${Math.floor(gameState.playerCells.reduce((sum, cell) => sum + cell.score, 0))}`;
}

export function drawMinimap(): void {
    if (!minimapCtx) return;

    const MINIMAP_SIZE = 150;
    const scale = MINIMAP_SIZE / WORLD_SIZE;
    
    minimapCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    minimapCtx.fillRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE);
    
    const viewWidth = canvas.width * scale;
    const viewHeight = canvas.height * scale;
    const viewX = gameState.camera.x * scale;
    const viewY = gameState.camera.y * scale;
    minimapCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    minimapCtx.strokeRect(viewX, viewY, viewWidth, viewHeight);

    gameState.aiPlayers.forEach(ai => {
        minimapCtx.beginPath();
        minimapCtx.arc(
            ai.x * scale,
            ai.y * scale,
            2,
            0,
            Math.PI * 2
        );
        minimapCtx.fillStyle = COLORS.MINIMAP.OTHER;
        minimapCtx.fill();
    });

    gameState.playerCells.forEach(cell => {
        minimapCtx.beginPath();
        minimapCtx.arc(
            cell.x * scale,
            cell.y * scale,
            3,
            0,
            Math.PI * 2
        );
        minimapCtx.fillStyle = COLORS.MINIMAP.PLAYER;
        minimapCtx.fill();
    });
}

interface LeaderboardPlayer {
    name: string;
    score: number;
    isPlayer: boolean;
}

export function updateLeaderboard(): void {
    if (!leaderboardContent) return;

    const playerTotalScore = gameState.playerCells.reduce((sum, cell) => sum + cell.score, 0);
    
    const allPlayers: LeaderboardPlayer[] = [
        { 
            name: gameState.playerName,
            score: playerTotalScore,
            isPlayer: true
        },
        ...gameState.aiPlayers.map(ai => ({
            name: ai.name,
            score: ai.score,
            isPlayer: false
        }))
    ];

    allPlayers.sort((a, b) => b.score - a.score);
    
    leaderboardContent.innerHTML = allPlayers
        .slice(0, 5)
        .map((player, index) => `
            <div class="leaderboard-item">
                <span class="${player.isPlayer ? 'player-name' : ''}">${index + 1}. ${player.name}</span>
                <span>${Math.floor(player.score)}</span>
            </div>
        `)
        .join('');
}
