class MovingPlatform extends Platform {
    constructor(game, x, y, width, height, tileIndex = 0, moveDistance = 50) {
        super(x, y, width, height, tileIndex);
        this.game = game;
        this.initialX = x;
        this.initialY = y;
        this.moveDistance = moveDistance;
        this.hasTriggered = false;
        this.isMovingPlatform = true; // Flag to identify moving platforms
    }

    update() {
        // Check if player is within 50 pixels horizontally
        for (const entity of this.game.entities) {
            if (entity instanceof Caveman && entity.life) {
                // Get the center x of the player
                const playerCenterX = entity.x + entity.width / 2;
                const platformCenterX = this.x + this.width / 2;
                
                // Distance between player and platform on x-axis
                const distanceX = Math.abs(playerCenterX - platformCenterX);
                
                // Trigger if player is within 50 pixels horizontally and hasn't triggered yet
                if (distanceX <= 50 && !this.hasTriggered) {
                    // Player is nearby, move the platform
                    this.x += this.moveDistance;
                    this.boundingBox.update(this.x - (this.bboxPad || 0), this.y);
                    this.hasTriggered = true;
                }
            }
        }
    }

    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.boundingBox.update(this.x - (this.bboxPad || 0), this.y);
        this.hasTriggered = false;
    }
}
