class Caveman {
    constructor(game) {
        this.game = game;

        this.x = 25;
        this.y = 25;

        this.width = 32 * 1.5;
        this.height = 32 * 1.5;

        this.facing = -1;
        this.speed = 300;

        
        this.velocityY = 0;
        this.gravity = 2000;      
        this.jumpStrength = 700;
        this.onGround = false;

        
        this.animator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman.png"),
            0, 0, 32, 32, 16, 0.034, 0, false, true
        );
        this.animating = false;  
    }

    update() {
        let dx = 0;

        // Horizontal movement input
        if (this.game.isKeyPressed("a")) {
            dx -= 1;
            this.facing = 1;
        }

        if (this.game.isKeyPressed("d")) {
            dx += 1;
            this.facing = -1;
        }

        // Jump input
        if (this.game.isKeyPressed(" ") && this.onGround) {
            this.velocityY = -this.jumpStrength;
            this.onGround = false;
        }

        const dt = this.game.clockTick;

        // Apply horizontal movement
        this.x += dx * this.speed * dt;

        // Apply gravity
        this.velocityY += this.gravity * dt;
        this.y += this.velocityY * dt;

        // Handle collisions with platforms
        this.handleCollisions();

        // Decide whether to animate: only if moving and on ground
        this.animating = this.onGround && dx !== 0;

        // Keep within canvas bounds
        const canvas = this.game.ctx.canvas;
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
    }

    handleCollisions() {
        this.onGround = false;

        for (const entity of this.game.entities) {
            if (!(entity instanceof Platform)) continue;

            if (this.collide(entity)) {
                // Landing on platform
                if (this.velocityY > 0) {
                    this.y = entity.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }
            }
        }
    }

    collide(other) {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    draw(ctx) {
        ctx.save();

        if (this.facing === -1) {
            ctx.scale(-1, 1);
        }

        const drawX = this.facing === -1 ? -this.x - this.width : this.x;

        if (this.animating) {
            // Advance animation while moving
            this.animator.drawFrame(this.game.clockTick, ctx, drawX, this.y, 1.5);
        } else {
            // Stop on first frame when idle or in air
            this.animator.drawFrame(0, ctx, drawX, this.y, 1.5);
        }

        ctx.restore();
    }
}
