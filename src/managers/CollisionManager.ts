import { Hero } from '../entities/Hero';
import { AnimalManager } from './AnimalManager';
import { GameField } from '../entities/GameField';
import { Animal, AnimalState } from '../entities/Animal';
import { GameConfig } from '../config/GameConfig';

/**
 * CollisionManager handles all collision detection and game logic
 * Implements the Mediator pattern to coordinate between game entities
 */
export class CollisionManager {
    private hero: Hero;
    private animalManager: AnimalManager;
    private gameField: GameField;
    private followingAnimals: Set<Animal> = new Set();

    constructor(hero: Hero, animalManager: AnimalManager, gameField: GameField) {
        this.hero = hero;
        this.animalManager = animalManager;
        this.gameField = gameField;
    }

    /**
     * Update collision detection and game logic
     */
    public update(): void {
        const heroPosition = this.hero.getPosition();
        const animals = this.animalManager.getAnimals();

        // Check for animals near hero
        const nearbyAnimals = this.animalManager.getAnimalsNearPosition(
            heroPosition, 
            GameConfig.ANIMAL_FOLLOW_DISTANCE
        );

        // Update following animals
        nearbyAnimals.forEach(animal => {
            if (animal.getState() === AnimalState.PATROL) {
                animal.follow(heroPosition);
                this.followingAnimals.add(animal);
            }
        });

        // Update animals in group
        this.followingAnimals.forEach(animal => {
            if (animal.getState() === AnimalState.FOLLOWING) {
                const distanceToHero = animal.getPosition().distanceTo(heroPosition);
                if (distanceToHero <= GameConfig.ANIMAL_GROUP_DISTANCE) {
                    animal.joinGroup(heroPosition);
                }
            }

            // Update follow target for all following/grouped animals
            if (animal.getState() === AnimalState.FOLLOWING || 
                animal.getState() === AnimalState.IN_GROUP) {
                animal.follow(heroPosition);
            }
        });

        // Check if animals reached the yard
        animals.forEach(animal => {
            if (animal.getState() !== AnimalState.SCORED) {
                const animalPos = animal.getPosition();
                if (this.gameField.isInYard(animalPos.x, animalPos.y)) {
                    // Score the animal
                    animal.setScored();
                    this.followingAnimals.delete(animal);
                    
                    // Add score and remove animal
                    const scoreManager = (this.animalManager as any).scoreManager;
                    scoreManager.addScore(1);
                    this.animalManager.removeAnimal(animal);
                }
            }
        });

        // Check if animals are too far from hero and should return to patrol
        this.followingAnimals.forEach(animal => {
            const distanceToHero = animal.getPosition().distanceTo(heroPosition);
            if (distanceToHero > GameConfig.ANIMAL_FOLLOW_DISTANCE * 2) {
                animal.patrol();
                this.followingAnimals.delete(animal);
            }
        });
    }
}
