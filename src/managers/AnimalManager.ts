import * as PIXI from 'pixi.js';
import { GameConfig } from '../config/GameConfig';
import { Animal, AnimalState } from '../entities/Animal';
import { Vector2 } from '../utils/Vector2';
import { ScoreManager } from './ScoreManager';

/**
 * AnimalManager handles animal spawning and lifecycle
 * Implements the Object Pool pattern for efficient animal management
 */
export class AnimalManager {
    private app: PIXI.Application;
    private animals: Animal[] = [];
    private scoreManager: ScoreManager;
    private lastSpawnTime: number = 0;
    private nextSpawnInterval: number = 0;

    constructor(app: PIXI.Application, scoreManager: ScoreManager) {
        this.app = app;
        this.scoreManager = scoreManager;
        this.calculateNextSpawnInterval();
    }

    /**
     * Start spawning animals
     */
    public startSpawning(): void {
        // Spawn initial animals
        for (let i = 0; i < GameConfig.INITIAL_ANIMAL_COUNT; i++) {
            this.spawnAnimal();
        }
        // Set last spawn time to prevent immediate additional spawning
        this.lastSpawnTime = Date.now();
    }

    /**
     * Update all animals and handle spawning
     */
    public update(delta: number): void {
        // Update existing animals
        this.animals.forEach(animal => animal.update(delta));

        // Check for spawning new animals
        const currentTime = Date.now();
        if (currentTime - this.lastSpawnTime > this.nextSpawnInterval && 
            this.animals.length < GameConfig.MAX_ANIMALS) {
            this.spawnAnimal();
            this.lastSpawnTime = currentTime;
            this.calculateNextSpawnInterval();
        }
    }

    /**
     * Spawn a new animal at a random position
     */
    private spawnAnimal(): void {
        const bounds = this.getSpawnBounds();
        const x = bounds.x + Math.random() * bounds.width;
        const y = bounds.y + Math.random() * bounds.height;

        const animal = new Animal(x, y);
        this.animals.push(animal);
        this.app.stage.addChild(animal.getSprite());
    }

    /**
     * Calculate next spawn interval
     */
    private calculateNextSpawnInterval(): void {
        this.nextSpawnInterval = GameConfig.MIN_SPAWN_INTERVAL + 
            Math.random() * (GameConfig.MAX_SPAWN_INTERVAL - GameConfig.MIN_SPAWN_INTERVAL);
    }

    /**
     * Get valid spawn bounds (excluding yard area)
     */
    private getSpawnBounds(): PIXI.Rectangle {
        const fieldBounds = new PIXI.Rectangle(
            GameConfig.FIELD_PADDING + GameConfig.ANIMAL_RADIUS,
            GameConfig.FIELD_PADDING + GameConfig.ANIMAL_RADIUS,
            GameConfig.GAME_WIDTH - GameConfig.YARD_WIDTH - GameConfig.FIELD_PADDING * 2 - GameConfig.ANIMAL_RADIUS * 2,
            GameConfig.GAME_HEIGHT - GameConfig.FIELD_PADDING * 2 - GameConfig.ANIMAL_RADIUS * 2
        );
        return fieldBounds;
    }

    /**
     * Remove an animal that has been scored
     */
    public removeAnimal(animal: Animal): void {
        const index = this.animals.indexOf(animal);
        if (index > -1) {
            this.animals.splice(index, 1);
            this.app.stage.removeChild(animal.getSprite());
        }
    }

    /**
     * Get all active animals
     */
    public getAnimals(): Animal[] {
        return this.animals;
    }

    /**
     * Check which animals are near a position
     */
    public getAnimalsNearPosition(position: Vector2, radius: number): Animal[] {
        return this.animals.filter(animal => {
            const distance = animal.getPosition().distanceTo(position);
            return distance <= radius && animal.getState() !== AnimalState.SCORED;
        });
    }
}
