class Caveman {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager || null;

        this.x = 25;
        this.y = 25;
        this.spawnX = null;
        this.spawnY = null;
        this.spawnCaptured = false;

        this.spriteWidth = 16;
        this.spriteHeight = 32;
        this.drawScale = 1.5;

        // Drawn size
        this.width = this.spriteWidth * this.drawScale;
        this.height = this.spriteHeight * this.drawScale;

        this.facing = -1; // -1 = right, 1 = left
        this.speed = 211;
        this.life = true;

        this.velocity = { x: 0, y: 0 };
        this.gravity = 2000;
        this.jumpStrength = 700;
        this.onGround = false;
        // Coyote time variables
        this.coyoteTime = 0.1; // seconds
        this.coyoteTimer = 0;


        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);

        // WALK animation
        // WALK animation
        // WALK animation
        this.walkAnimator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman.png"),
            0, 0, 32, 32, 16, 0.034, 0, false, true
        );

        // IDLE animation (single frame)
        // IDLE animation (single frame)
        // IDLE animation (single frame)
        this.idleAnimator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman_idle.png"),
            0, 0, 32, 32, 1, 1, 0, false, true
        );

        this.currentAnimator = this.idleAnimator;
    }

    update() {
        // Initialize spawn point if not captured
        if (!this.spawnCaptured) {
            this.spawnX = this.x;
            this.spawnY = this.y;
            this.spawnCaptured = true;
        }

        const TICK = this.game.clockTick;
        let moving = false;
        // Track previous onGround state for coyote time
        const wasOnGround = this.onGround;

        // Handle input for movement
        if (this.game.isKeyPressed("a") || this.game.isKeyPressed("arrowleft")) {
            this.velocity.x = -this.speed;
            this.facing = 1;
            moving = true;
        } else if (this.game.isKeyPressed("d") || this.game.isKeyPressed("arrowright")) {
            this.velocity.x = this.speed;
            this.facing = -1;
            moving = true;
        } else {
            this.velocity.x = 0;
        }

        // Handle jump (coyote time)
        if (this.game.isKeyPressed(" ") && (this.onGround || this.coyoteTimer > 0)) {
            this.velocity.y = -this.jumpStrength;
            this.onGround = false;
            this.coyoteTimer = 0;
        }

        // Apply gravity
        this.velocity.y += this.gravity * TICK;

        // --- Horizontal movement and collision ---
        const prevX = this.x;
        this.x += this.velocity.x * TICK;
        this.updateBoundingBox();
        let horizontalBlocked = false;
        for (const entity of this.game.entities) {
            if (!(entity instanceof Platform || entity instanceof Border)) continue;
            if (entity instanceof FakePlatform) continue;
            if (this.boundingBox.collide(entity.boundingBox)) {
                // Block horizontal movement, revert x
                this.x = prevX;
                this.velocity.x = 0;
                this.updateBoundingBox();
                horizontalBlocked = true;
                break;
            }
        }

        // --- Vertical movement and collision ---
        const prevY = this.y;
        this.y += this.velocity.y * TICK;
        this.updateBoundingBox();
        this.onGround = false;
        for (const entity of this.game.entities) {
            // Handle spikes
            if (entity instanceof Spikes || entity instanceof SpikesUD || entity instanceof SpikesLeft || entity instanceof SpikesRight) {
                if (this.boundingBox.collide(entity.boundingBox)) {
                    if (!this.spawnCaptured) {
                        this.spawnX = this.x;
                        this.spawnY = this.y;
                        this.spawnCaptured = true;
                    }
                    this.life = false;
                    this.x = this.spawnX ?? this.x;
                    this.y = this.spawnY ?? this.y;
                    this.velocity = { x: 0, y: 0 };
                    this.updateBoundingBox();
                }
            }
            // Handle platforms and borders
            if (!(entity instanceof Platform || entity instanceof Border)) continue;
            if (entity instanceof FakePlatform && !entity.isMovingPlatform) continue;
            if (this.boundingBox.collide(entity.boundingBox)) {
                const overlapTop = this.boundingBox.bottom - entity.boundingBox.top;
                const overlapBottom = entity.boundingBox.bottom - this.boundingBox.top;
                // Only land on top if falling from above
                const prevBottom = prevY + this.boundingBox.height;
                if (overlapTop < overlapBottom && prevBottom <= entity.boundingBox.top && this.velocity.y >= 0) {
                    this.y = entity.boundingBox.top - this.boundingBox.height;
                    this.velocity.y = 0;
                    this.onGround = true;
                    this.updateBoundingBox();
                } else if (overlapTop >= overlapBottom && this.velocity.y < 0) {
                    // Hitting head on bottom of platform
                    this.y = entity.boundingBox.bottom;
                    this.velocity.y = 0;
                    this.updateBoundingBox();
                }
            }
        }

        // --- World bounds ---
        const minX = 0;
        const maxX = this.game.ctx.canvas.width - this.width;
        if (this.x < minX) {
            this.x = minX;
            this.velocity.x = 0;
            this.updateBoundingBox();
        } else if (this.x > maxX) {
            this.x = maxX;
            this.velocity.x = 0;
            this.updateBoundingBox();
        }

        // --- Coyote time logic ---
        if (!this.onGround && wasOnGround && this.velocity.y >= 0) {
            this.coyoteTimer = this.coyoteTime;
        } else if (this.onGround) {
            this.coyoteTimer = this.coyoteTime;
        } else if (this.coyoteTimer > 0) {
            this.coyoteTimer -= TICK;
            if (this.coyoteTimer < 0) this.coyoteTimer = 0;
        }

        // --- Level progression ---
        if (this.boundingBox.left > this.game.ctx.canvas.width) {
            if (this.sceneManager && typeof this.sceneManager.nextLevel === "function") {
                this.sceneManager.nextLevel();
            }
        }

        this.currentAnimator = moving ? this.walkAnimator : this.idleAnimator;
    }

    updateBoundingBox() {
        const frameW = 32;
        const frameH = 32;

        const drawW = frameW * this.drawScale;
        const drawH = frameH * this.drawScale;

        const originalHitW = this.width;
        const originalHitH = this.height;

        const hitW = originalHitW - 5;
        const hitH = originalHitH;

        const offsetX = (drawW - hitW) / 2;
        const offsetY = (drawH - hitH) / 2;

        this.boundingBox.update(
            this.x + offsetX,
            this.y + offsetY
        );

        this.boundingBox.width = hitW;
        this.boundingBox.height = hitH;
    }

    draw(ctx) {
        ctx.save();

        const frameW = 32;
        const drawW  = frameW * this.drawScale;

        ctx.translate(this.x, this.y);

        if (this.facing === -1) {
            ctx.translate(drawW, 0);
            ctx.scale(-1, 1);
        }

        this.currentAnimator.drawFrame(
            this.game.clockTick,
            ctx,
            0,
            0,
            this.drawScale
        );

        ctx.restore();
    }
}