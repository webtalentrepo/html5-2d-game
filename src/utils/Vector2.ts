/**
 * 2D Vector utility class
 * Provides vector math operations
 */
export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculate the magnitude (length) of the vector
     */
    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalize the vector (make it unit length)
     */
    public normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag > 0) {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }

    /**
     * Calculate distance to another vector
     */
    public distanceTo(other: Vector2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Create a copy of this vector
     */
    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     * Static method to subtract two vectors
     */
    public static subtract(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    /**
     * Static method to add two vectors
     */
    public static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
}
