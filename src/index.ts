import { Game } from './Game';

// Initialize the game when the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.start();
});
