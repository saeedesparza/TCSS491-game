class Caveman {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager || null;

        this.x = 25;
        this.y = 25;

        this.spriteWidth = 23;
        this.spriteHeight = 30;
        this.drawScale = 1.5;

        // Bounding box dimensions match the actual drawn size
        this.width = this.spriteWidth * this.drawScale;
        this.height = this.spriteHeight * this.drawScale;

        this.facing = 1; // 1 = right, -1 = left
        this.speed = 300;
        this.life = true;

        this.velocity = { x: 0, y: 0 };
        this.gravity = 2000;
        this.jumpStrength = 700;
        this.onGround = false;

        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);

        // WALK animation
        // WALK animation
        this.walkAnimator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman.png"),
            0, 0, 32, 32, 16, 0.034, 0, false, true
        );

        // IDLE animation (single frame)
        // IDLE animation (single frame)
        this.idleAnimator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman_idle.png"),
            0, 0, 15, 31, 1, 1, 0, false, true
        );

        this.currentAnimator = this.idleAnimator;
    }

    update() {
        const TICK = this.game.clockTick;
        let moving = false;

        if (this.game.isKeyPressed("a") || this.game.isKeyPressed("arrowleft")) {
            this.velocity.x = -this.speed;
            this.facing = 1;
            moving = true;
        }
        else if (this.game.isKeyPressed("d") || this.game.isKeyPressed("arrowright")) {
            this.velocity.x = this.speed;
            this.facing = -1;
            moving = true;
        }
        else {
            this.velocity.x = 0;
        }

        if (this.game.isKeyPressed(" ") && this.onGround) {
            this.velocity.y = -this.jumpStrength;
            this.onGround = false;
        }

        this.velocity.y += this.gravity * TICK;

        this.x += this.velocity.x * TICK;
        this.boundingBox.update(this.x, this.y);
        this.handleHorizontalCollisions();

        this.y += this.velocity.y * TICK;
        this.boundingBox.update(this.x, this.y);
        this.handleVerticalCollisions();

        // If the caveman touches the right edge of the canvas go to the next level
        if (this.boundingBox.right >= this.game.ctx.canvas.width) {
            if (this.sceneManager && typeof this.sceneManager.nextLevel === "function") {
                this.sceneManager.nextLevel();
            }
        }

        this.currentAnimator = moving ? this.walkAnimator : this.idleAnimator;
    }

    handleHorizontalCollisions() {
        for (const entity of this.game.entities) {
            if (!(entity instanceof Platform || entity instanceof Border)) continue;

            if (this.boundingBox.collide(entity.boundingBox)) {
                // Determine which side to push out from
                const overlapLeft = this.boundingBox.right - entity.boundingBox.left;
                const overlapRight = entity.boundingBox.right - this.boundingBox.left;

                if (overlapLeft < overlapRight) {
                    // Colliding from the left side
                    this.x = entity.boundingBox.left - this.boundingBox.width;
                } else {
                    // Colliding from the right side
                    this.x = entity.boundingBox.right;
                }

                this.velocity.x = 0;
                this.boundingBox.update(this.x, this.y);
            }
        }
    }

    handleVerticalCollisions() {
        this.onGround = false;

        for (const entity of this.game.entities) {
            if (entity instanceof Spikes || entity instanceof SpikesUD) {
                if (this.boundingBox.collide(entity.boundingBox)) {
                    this.life = false;
                    this.x = 50;
                    this.y = 400;
                    this.velocity = { x: 0, y: 0 };
                    this.boundingBox.update(this.x, this.y);
                }
            }
            if (!(entity instanceof Platform)) continue;

            if (this.boundingBox.collide(entity.boundingBox)) {
                
                const overlapTop = this.boundingBox.bottom - entity.boundingBox.top;
                const overlapBottom = entity.boundingBox.bottom - this.boundingBox.top;

                if (overlapTop < overlapBottom) {
                    
                    this.y = entity.boundingBox.top - this.boundingBox.height;
                    this.velocity.y = 0;
                    this.onGround = true;
                } else {
                    
                    this.y = entity.boundingBox.bottom;
                    this.velocity.y = 0;
                }

                this.boundingBox.update(this.x, this.y);
            }
        }
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
    }
}