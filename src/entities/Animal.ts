import * as PIXI from 'pixi.js';
import { GameConfig } from '../config/GameConfig';
import { Vector2 } from '../utils/Vector2';

/**
 * Animal states for the State pattern implementation
 */
export enum AnimalState {
    PATROL = 'patrol',
    FOLLOWING = 'following',
    IN_GROUP = 'in_group',
    SCORED = 'scored'
}

/**
 * Animal entity
 * Implements the State pattern for different behaviors
 */
export class Animal {
    private sprite: PIXI.Graphics;
    private position: Vector2;
    private state: AnimalState = AnimalState.PATROL;
    private patrolCenter: Vector2;
    private patrolAngle: number = Math.random() * Math.PI * 2;
    private followTarget: Vector2 | null = null;
    private id: string;

    constructor(x: number, y: number) {
        this.sprite = new PIXI.Graphics();
        this.position = new Vector2(x, y);
        this.patrolCenter = new Vector2(x, y);
        this.id = `animal_${Date.now()}_${Math.random()}`;
        this.drawAnimal();
        this.sprite.position.set(x, y);
    }

    /**
     * Draw the animal circle
     */
    private drawAnimal(): void {
        this.sprite.clear();
        this.sprite.beginFill(GameConfig.ANIMAL_COLOR);
        this.sprite.drawCircle(0, 0, GameConfig.ANIMAL_RADIUS);
        this.sprite.endFill();
    }

    /**
     * Update animal behavior based on current state
     */
    public update(delta: number): void {
        switch (this.state) {
            case AnimalState.PATROL:
                this.updatePatrol(delta);
                break;
            case AnimalState.FOLLOWING:
            case AnimalState.IN_GROUP:
                this.updateFollowing(delta);
                break;
        }

        // Update sprite position
        this.sprite.position.set(this.position.x, this.position.y);
    }

    /**
     * Update patrol behavior
     */
    private updatePatrol(delta: number): void {
        // Circular patrol movement
        this.patrolAngle += (GameConfig.ANIMAL_PATROL_SPEED / GameConfig.ANIMAL_PATROL_RADIUS) * (delta / 60);
        
        const targetX = this.patrolCenter.x + Math.cos(this.patrolAngle) * GameConfig.ANIMAL_PATROL_RADIUS;
        const targetY = this.patrolCenter.y + Math.sin(this.patrolAngle) * GameConfig.ANIMAL_PATROL_RADIUS;

        // Keep within bounds
        const bounds = this.getFieldBounds();
        this.position.x = Math.max(bounds.x + GameConfig.ANIMAL_RADIUS, 
                                 Math.min(bounds.x + bounds.width - GameConfig.ANIMAL_RADIUS, targetX));
        this.position.y = Math.max(bounds.y + GameConfig.ANIMAL_RADIUS, 
                                 Math.min(bounds.y + bounds.height - GameConfig.ANIMAL_RADIUS, targetY));
    }

    /**
     * Update following behavior
     */
    private updateFollowing(delta: number): void {
        if (!this.followTarget) return;

        const direction = Vector2.subtract(this.followTarget, this.position);
        const distance = direction.magnitude();

        if (distance > GameConfig.ANIMAL_GROUP_DISTANCE) {
            direction.normalize();
            const moveDistance = GameConfig.ANIMAL_SPEED * (delta / 60);
            
            this.position.x += direction.x * moveDistance;
            this.position.y += direction.y * moveDistance;
        }
    }

    /**
     * Set the animal to follow a target
     */
    public follow(target: Vector2): void {
        this.state = AnimalState.FOLLOWING;
        this.followTarget = target;
    }

    /**
     * Set the animal as part of a group
     */
    public joinGroup(target: Vector2): void {
        this.state = AnimalState.IN_GROUP;
        this.followTarget = target;
    }

    /**
     * Set the animal to patrol mode
     */
    public patrol(): void {
        this.state = AnimalState.PATROL;
        this.followTarget = null;
        this.patrolCenter = this.position.clone();
    }

    /**
     * Mark animal as scored
     */
    public setScored(): void {
        this.state = AnimalState.SCORED;
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

    // Getters
    public getSprite(): PIXI.Graphics { return this.sprite; }
    public getPosition(): Vector2 { return this.position.clone(); }
    public getState(): AnimalState { return this.state; }
    public getId(): string { return this.id; }
}
