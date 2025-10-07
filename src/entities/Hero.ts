import * as PIXI from 'pixi.js';
import { GameConfig } from '../config/GameConfig';
import { Vector2 } from '../utils/Vector2';

/**
 * Hero entity - the main character controlled by the player
 * Implements the Command pattern for movement
 */
export class Hero {
    private app: PIXI.Application;
    private sprite: PIXI.Graphics;
    private position: Vector2;
    private targetPosition: Vector2 | null = null;
    private speed: number = GameConfig.HERO_SPEED;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.sprite = new PIXI.Graphics();
        this.position = new Vector2(GameConfig.HERO_START_X, GameConfig.HERO_START_Y);
    }

    /**
     * Create the hero sprite
     */
    public create(): void {
        this.drawHero();
        this.sprite.position.set(this.position.x, this.position.y);
        this.app.stage.addChild(this.sprite);
    }

    /**
     * Draw the hero circle
     */
    private drawHero(): void {
        this.sprite.clear();
        this.sprite.beginFill(GameConfig.HERO_COLOR);
        this.sprite.drawCircle(0, 0, GameConfig.HERO_RADIUS);
        this.sprite.endFill();
    }

    /**
     * Update hero position
     */
    public update(delta: number): void {
        if (this.targetPosition) {
            const direction = Vector2.subtract(this.targetPosition, this.position);
            const distance = direction.magnitude();

            if (distance > 2) {
                // Move towards target
                direction.normalize();
                const moveDistance = this.speed * (delta / 60); // Convert to frame-independent movement
                
                this.position.x += direction.x * moveDistance;
                this.position.y += direction.y * moveDistance;

                // Keep hero within field bounds
                const bounds = this.getFieldBounds();
                this.position.x = Math.max(bounds.x + GameConfig.HERO_RADIUS, 
                                         Math.min(bounds.x + bounds.width - GameConfig.HERO_RADIUS, this.position.x));
                this.position.y = Math.max(bounds.y + GameConfig.HERO_RADIUS, 
                                         Math.min(bounds.y + bounds.height - GameConfig.HERO_RADIUS, this.position.y));

                this.sprite.position.set(this.position.x, this.position.y);
            } else {
                // Reached target
                this.targetPosition = null;
            }
        }
    }

    /**
     * Set target position for hero movement
     */
    public moveTo(x: number, y: number): void {
        this.targetPosition = new Vector2(x, y);
    }

    /**
     * Get hero position
     */
    public getPosition(): Vector2 {
        return this.position.clone();
    }

    /**
     * Get field bounds for movement constraints
     */
    private getFieldBounds(): PIXI.Rectangle {
        return new PIXI.Rectangle(
            GameConfig.FIELD_PADDING,
            GameConfig.FIELD_PADDING,
            GameConfig.GAME_WIDTH - GameConfig.FIELD_PADDING * 2,
            GameConfig.GAME_HEIGHT - GameConfig.FIELD_PADDING * 2
        );
    }
}
