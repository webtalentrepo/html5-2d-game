"# Herdsman Game

A 2D mini-game where the player controls a hero to collect animals and guide them to a destination yard.

## Game Overview

In Herdsman, you play as a red hero who must collect white animals scattered across the game field and lead them to the yellow yard. Animals will follow you when you get close to them, forming a group. Successfully guiding animals to the yard increases your score.

## How to Play

1. **Click anywhere** on the game field to move the hero
2. **Get close to animals** (white circles) to make them follow you
3. **Lead the animals** to the yellow yard on the right
4. **Score points** for each animal that reaches the yard

## Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm start
```

3. Build for production:
```bash
npm build
```

## Architecture & Design Patterns

### Object-Oriented Programming Principles

The game is built following SOLID principles:

- **Single Responsibility**: Each class has one clear purpose (e.g., `Hero` handles player movement, `AnimalManager` manages animal lifecycle)
- **Open/Closed**: The system is extensible through interfaces and base classes
- **Dependency Inversion**: High-level modules depend on abstractions, not concrete implementations

### Design Patterns Used

1. **Facade Pattern** (`Game.ts`)
   - Provides a simplified interface to the complex game subsystems
   - Orchestrates initialization and updates of all game components

2. **State Pattern** (`Animal.ts`)
   - Animals have different states: PATROL, FOLLOWING, IN_GROUP, SCORED
   - Each state defines specific behavior for the animal

3. **Command Pattern** (`InputManager.ts`, `Hero.ts`)
   - User input is encapsulated as movement commands
   - Decouples input handling from movement execution

4. **Observer Pattern** (`ScoreManager.ts`)
   - Score updates automatically notify the UI
   - Maintains loose coupling between game logic and UI

5. **Mediator Pattern** (`CollisionManager.ts`)
   - Centralizes complex communications between game entities
   - Handles collision detection and game rules

6. **Object Pool Pattern** (implicit in `AnimalManager.ts`)
   - Efficient management of animal entities
   - Reusable animal spawning system

7. **Configuration Pattern** (`GameConfig.ts`)
   - Centralizes all game constants and settings
   - Makes the game easily tweakable

### Code Architecture

```
src/
├── index.ts              # Entry point
├── Game.ts               # Main game facade
├── config/
│   └── GameConfig.ts     # Game configuration
├── entities/
│   ├── GameField.ts      # Game field and yard
│   ├── Hero.ts           # Player character
│   └── Animal.ts         # Animal entities
├── managers/
│   ├── AnimalManager.ts  # Animal lifecycle management
│   ├── CollisionManager.ts # Game logic and collisions
│   ├── InputManager.ts   # User input handling
│   └── ScoreManager.ts   # Score tracking
└── utils/
    └── Vector2.ts        # 2D vector mathematics
```

### Key Architectural Decisions

1. **Entity-Component System**: While not a full ECS, entities (Hero, Animal) are separated from their management logic
2. **Manager Classes**: Dedicated managers handle specific aspects of the game (input, collisions, scoring)
3. **Immutable Vectors**: Vector2 operations return new instances to prevent unintended mutations
4. **Frame-Independent Movement**: All movement calculations account for delta time

## Technologies Used

- **TypeScript**: For type safety and better code organization
- **PixiJS**: High-performance 2D rendering library
- **Webpack**: Module bundling and development server
- **HTML5 Canvas**: Rendered through PixiJS

## Game Features

### Core Features (Implemented)
- ✅ Click-to-move hero control
- ✅ Random animal spawning
- ✅ Animal following behavior
- ✅ Group formation mechanics
- ✅ Scoring system
- ✅ Visual game field with yard

### Additional Features (Implemented)
- ✅ Continuous animal spawning with random intervals
- ✅ Animal patrol behavior when not following
- ✅ Boundary constraints for all entities
- ✅ Smooth, frame-independent movement

## Performance Considerations

- Efficient sprite rendering with PixiJS
- Object pooling for animals (implicit)
- Minimal DOM manipulation
- Optimized collision detection with distance checks" 
