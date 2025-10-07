import * as PIXI from 'pixi.js';
import { GameConfig } from './config/GameConfig';
import { GameField } from './entities/GameField';
import { Hero } from './entities/Hero';
import { AnimalManager } from './managers/AnimalManager';
import { ScoreManager } from './managers/ScoreManager';
import { InputManager } from './managers/InputManager';
import { CollisionManager } from './managers/CollisionManager';

/**
 * Main Game class that orchestrates all game systems
 * Implements the Facade pattern to provide a simple interface to complex subsystems
 */
export class Game {
    private app: PIXI.Application;
    private gameField: GameField;
    private hero: Hero;
    private animalManager: AnimalManager;
    private scoreManager: ScoreManager;
    private inputManager: InputManager;
    private collisionManager: CollisionManager;

    constructor() {
        this.app = new PIXI.Application({
            width: GameConfig.GAME_WIDTH,
            height: GameConfig.GAME_HEIGHT,
            backgroundColor: GameConfig.BACKGROUND_COLOR,
            antialias: true,
        });

        // Initialize game systems
        this.gameField = new GameField(this.app);
        this.hero = new Hero(this.app);
        this.scoreManager = new ScoreManager();
        this.animalManager = new AnimalManager(this.app, this.scoreManager);
        this.inputManager = new InputManager(this.app, this.hero);
        this.collisionManager = new CollisionManager(this.hero, this.animalManager, this.gameField);
    }

    /**
     * Start the game
     */
    public start(): void {
        // Add canvas to DOM
        const gameContainer = document.getElementById('game');
        if (gameContainer) {
            gameContainer.appendChild(this.app.view as HTMLCanvasElement);
        }

        // Initialize game components
        this.gameField.create();
        this.hero.create();
        this.animalManager.startSpawning();

        // Start game loop
        this.app.ticker.add(this.update, this);
    }

    /**
     * Main game update loop
     */
    private update(delta: number): void {
        // Update game systems
        this.hero.update(delta);
        this.animalManager.update(delta);
        this.collisionManager.update();
    }
}
