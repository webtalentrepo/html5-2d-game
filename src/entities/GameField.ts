import * as PIXI from 'pixi.js';
import { GameConfig } from '../config/GameConfig';

/**
 * GameField entity representing the game area and destination yard
 */
export class GameField {
    private app: PIXI.Application;
    private field: PIXI.Graphics;
    private yard: PIXI.Graphics;
    private yardBounds: PIXI.Rectangle;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.field = new PIXI.Graphics();
        this.yard = new PIXI.Graphics();
        this.yardBounds = new PIXI.Rectangle(
            GameConfig.GAME_WIDTH - GameConfig.YARD_WIDTH - GameConfig.FIELD_PADDING,
            (GameConfig.GAME_HEIGHT - GameConfig.YARD_HEIGHT) / 2,
            GameConfig.YARD_WIDTH,
            GameConfig.YARD_HEIGHT
        );
    }

    /**
     * Create the game field and yard
     */
    public create(): void {
        // Draw game field (green area)
        this.field.beginFill(GameConfig.FIELD_COLOR);
        this.field.drawRect(
            GameConfig.FIELD_PADDING,
            GameConfig.FIELD_PADDING,
            GameConfig.GAME_WIDTH - GameConfig.FIELD_PADDING * 2,
            GameConfig.GAME_HEIGHT - GameConfig.FIELD_PADDING * 2
        );
        this.field.endFill();

        // Draw yard (yellow area)
        this.yard.beginFill(GameConfig.YARD_COLOR);
        this.yard.drawRect(
            this.yardBounds.x,
            this.yardBounds.y,
            this.yardBounds.width,
            this.yardBounds.height
        );
        this.yard.endFill();

        // Add to stage
        this.app.stage.addChild(this.field);
        this.app.stage.addChild(this.yard);
    }

    /**
     * Get the bounds of the game field
     */
    public getFieldBounds(): PIXI.Rectangle {
        return new PIXI.Rectangle(
            GameConfig.FIELD_PADDING,
            GameConfig.FIELD_PADDING,
            GameConfig.GAME_WIDTH - GameConfig.FIELD_PADDING * 2,
            GameConfig.GAME_HEIGHT - GameConfig.FIELD_PADDING * 2
        );
    }

    /**
     * Get the bounds of the yard
     */
    public getYardBounds(): PIXI.Rectangle {
        return this.yardBounds;
    }

    /**
     * Check if a point is inside the yard
     */
    public isInYard(x: number, y: number): boolean {
        return this.yardBounds.contains(x, y);
    }
}
