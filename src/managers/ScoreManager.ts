/**
 * ScoreManager handles game scoring
 * Implements the Observer pattern to notify UI of score changes
 */
export class ScoreManager {
    private score: number = 0;
    private scoreElement: HTMLElement | null;

    constructor() {
        this.scoreElement = document.getElementById('score');
        this.updateDisplay();
    }

    /**
     * Add points to the score
     */
    public addScore(points: number = 1): void {
        this.score += points;
        this.updateDisplay();
    }

    /**
     * Get current score
     */
    public getScore(): number {
        return this.score;
    }

    /**
     * Update score display in UI
     */
    private updateDisplay(): void {
        if (this.scoreElement) {
            this.scoreElement.textContent = `Score: ${this.score}`;
        }
    }

    /**
     * Reset score to zero
     */
    public reset(): void {
        this.score = 0;
        this.updateDisplay();
    }
}
