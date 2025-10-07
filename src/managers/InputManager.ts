import * as PIXI from 'pixi.js';
import { Hero } from '../entities/Hero';

/**
 * InputManager handles user input
 * Implements the Command pattern for input handling
 */
export class InputManager {
    private app: PIXI.Application;
    private hero: Hero;

    constructor(app: PIXI.Application, hero: Hero) {
        this.app = app;
        this.hero = hero;
        this.setupEventListeners();
    }

    /**
     * Setup input event listeners
     */
    private setupEventListeners(): void {
        // Make the canvas interactive
        this.app.stage.interactive = true;
        this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.app.screen.width, this.app.screen.height);

        // Handle click/tap events
        this.app.stage.on('pointerdown', this.handlePointerDown, this);
    }

    /**
     * Handle pointer down events (mouse click or touch)
     */
    private handlePointerDown(event: PIXI.FederatedPointerEvent): void {
        const position = event.global;
        this.hero.moveTo(position.x, position.y);
    }
}
