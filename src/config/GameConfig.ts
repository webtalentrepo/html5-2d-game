/**
 * Game configuration constants
 * Implements the Configuration pattern
 */
export class GameConfig {
    // Game dimensions
    public static readonly GAME_WIDTH = 800;
    public static readonly GAME_HEIGHT = 600;
    
    // Colors
    public static readonly BACKGROUND_COLOR = 0x2c3e50;
    public static readonly FIELD_COLOR = 0x27ae60;
    public static readonly YARD_COLOR = 0xf1c40f;
    public static readonly HERO_COLOR = 0xe74c3c;
    public static readonly ANIMAL_COLOR = 0xecf0f1;
    
    // Game field
    public static readonly FIELD_PADDING = 20;
    public static readonly YARD_WIDTH = 150;
    public static readonly YARD_HEIGHT = 100;
    
    // Hero
    public static readonly HERO_RADIUS = 15;
    public static readonly HERO_SPEED = 200; // pixels per second
    public static readonly HERO_START_X = 100;
    public static readonly HERO_START_Y = 300;
    
    // Animals
    public static readonly ANIMAL_RADIUS = 10;
    public static readonly ANIMAL_SPEED = 50; // pixels per second
    public static readonly ANIMAL_FOLLOW_DISTANCE = 50;
    public static readonly ANIMAL_GROUP_DISTANCE = 30;
    public static readonly ANIMAL_PATROL_SPEED = 30;
    public static readonly ANIMAL_PATROL_RADIUS = 50;
    
    // Spawning
    public static readonly MIN_SPAWN_INTERVAL = 2000; // milliseconds
    public static readonly MAX_SPAWN_INTERVAL = 5000; // milliseconds
    public static readonly INITIAL_ANIMAL_COUNT = 5;
    public static readonly MAX_ANIMALS = 20;
}
