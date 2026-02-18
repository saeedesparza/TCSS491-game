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
        this.drawScale = 1.55;

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

        this.bboxOffsetX = -10;
        this.bboxOffsetY = 0;

        this.boundingBox = new BoundingBox(this.x + this.bboxOffsetX, this.y + this.bboxOffsetY, this.width, this.height);

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
        if (!this.spawnCaptured) {
            this.spawnX = this.x;
            this.spawnY = this.y;
            this.spawnCaptured = true;
        }

        const TICK = this.game.clockTick;
        let moving = false;
        // Track previous onGround state for coyote time
        const wasOnGround = this.onGround;

        if (this.game.isKeyPressed("a") || this.game.isKeyPressed("arrowleft")) {
            this.velocity.x = -this.speed;
            this.facing = 1;
            this.bboxOffsetX = 10;
            moving = true;
        }
        else if (this.game.isKeyPressed("d") || this.game.isKeyPressed("arrowright")) {
            this.velocity.x = this.speed;
            this.facing = -1;
            this.bboxOffsetX = -10;
            moving = true;
        }
        else {
            this.velocity.x = 0;
        }

        // Coyote time: allow jump if onGround or within coyote window
        if (this.game.isKeyPressed(" ") && (this.onGround || this.coyoteTimer > 0)) {
            this.velocity.y = -this.jumpStrength;
            this.onGround = false;
            this.coyoteTimer = 0; // Reset after jump
        }

        this.velocity.y += this.gravity * TICK;

        this.x += this.velocity.x * TICK;
        this.updateBoundingBox();
        this.handleHorizontalCollisions();

        this.y += this.velocity.y * TICK;
        this.updateBoundingBox();
        this.handleVerticalCollisions();

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

        // Coyote time logic: if just left ground, start timer
        if (!this.onGround && wasOnGround && this.velocity.y >= 0) {
            this.coyoteTimer = this.coyoteTime;
        } else if (this.onGround) {
            this.coyoteTimer = this.coyoteTime;
        } else if (this.coyoteTimer > 0) {
            this.coyoteTimer -= TICK;
            if (this.coyoteTimer < 0) this.coyoteTimer = 0;
        }

        // Advance level only after the caveman fully exits the right side.
        // This avoids triggering while simply colliding with a 1px right border.
        if (this.boundingBox.left > this.game.ctx.canvas.width) {
            if (this.sceneManager && typeof this.sceneManager.nextLevel === "function") {
                this.sceneManager.nextLevel();
            }
        }

        this.currentAnimator = moving ? this.walkAnimator : this.idleAnimator;
    }

    handleHorizontalCollisions() {
        for (const entity of this.game.entities) {
            if (!(entity instanceof Platform || entity instanceof Border)) continue;
            if (entity instanceof FakePlatform) continue;
            if (!(entity instanceof Platform || entity instanceof Border)) continue;

            if (this.boundingBox.collide(entity.boundingBox)) {
                const overlapX = Math.min(
                    this.boundingBox.right - entity.boundingBox.left,
                    entity.boundingBox.right - this.boundingBox.left
                );
                const overlapY = Math.min(
                    this.boundingBox.bottom - entity.boundingBox.top,
                    entity.boundingBox.bottom - this.boundingBox.top
                );

                if (overlapX <= 0 || overlapY <= 0) continue;

                if (overlapX >= overlapY) {
                    continue;
                }

                // Determine which side to push out from
                const overlapLeft = this.boundingBox.right - entity.boundingBox.left;
                const overlapRight = entity.boundingBox.right - this.boundingBox.left;

                if (overlapLeft < overlapRight) {
                    // Colliding from the left side
                    this.x = (entity.boundingBox.left - this.boundingBox.width) - this.bboxOffsetX;
                } else {
                    // Colliding from the right side
                    this.x = entity.boundingBox.right - this.bboxOffsetX;
                }

                this.velocity.x = 0;
                this.updateBoundingBox();
            }
        }
    }

    handleVerticalCollisions() {
        this.onGround = false;

        for (const entity of this.game.entities) {
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
            if (!(entity instanceof Platform || entity instanceof Border)) continue;
            if (entity instanceof FakePlatform && !entity.isMovingPlatform) continue;

            if (this.boundingBox.collide(entity.boundingBox)) {
                
                
                const overlapTop = this.boundingBox.bottom - entity.boundingBox.top;
                const overlapBottom = entity.boundingBox.bottom - this.boundingBox.top;

                if (overlapTop < overlapBottom) {
                    
                    
                    this.y = (entity.boundingBox.top - this.boundingBox.height) - this.bboxOffsetY;
                    this.velocity.y = 0;
                    this.onGround = true;
                } else {
                    
                    
                    this.y = entity.boundingBox.bottom - this.bboxOffsetY;
                    this.velocity.y = 0;
                }

                this.updateBoundingBox();
            }
        }
    }

    updateBoundingBox() {
        this.boundingBox.update(
            this.x + this.bboxOffsetX,
            this.y + this.bboxOffsetY
        );
    }

    draw(ctx) {
        ctx.save();

        if (this.facing === -1) {
            ctx.scale(-1, 1);
        }

        const drawX = this.facing === -1
            ? -this.x - this.width
            : this.x;

        this.currentAnimator.drawFrame(
            this.game.clockTick,
            ctx,
            drawX,
            this.y,
            1.5
        );

        ctx.restore();

        // shows coordinates for debugging
        ctx.fillStyle = "white";
         ctx.font = "16px Arial";
         ctx.fillText("X: " + Math.round(this.x) + " Y: " + Math.round(this.y), 10, 30);
    }
}