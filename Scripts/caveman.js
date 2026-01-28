class Caveman {
    constructor(game) {
        this.game = game;

        this.x = 25;
        this.y = 25;

        this.width = 32 * 1.27;
        this.height = 32 * 1.27;

        this.facing = 1; // 1 = right, -1 = left
        this.speed = 300;
        this.life = true;

        this.velocity = { x: 0, y: 0 };
        this.gravity = 2000;
        this.jumpStrength = 700;
        this.onGround = false;

        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);

        // WALK animation
        this.walkAnimator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman.png"),
            0, 0, 32, 32, 16, 0.034, 0, false, true
        );

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

        // ---- INPUT ----
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

        // ---- PHYSICS ----
        this.velocity.y += this.gravity * TICK;

        // ---- MOVE X ----
        this.x += this.velocity.x * TICK;
        this.boundingBox.update(this.x + 8, this.y + 4);
        this.handleHorizontalCollisions();

        // ---- MOVE Y ----
        this.y += this.velocity.y * TICK;
        this.boundingBox.update(this.x + 8, this.y + 4);
        this.handleVerticalCollisions();

        // ---- ANIMATION STATE ----
        this.currentAnimator = moving ? this.walkAnimator : this.idleAnimator;
    }

    handleHorizontalCollisions() {
        for (const entity of this.game.entities) {
            if (!(entity instanceof Platform)) continue;

            if (this.boundingBox.collide(entity.boundingBox)) {
                if (this.velocity.x > 0) {
                    this.x = entity.boundingBox.left - this.boundingBox.width - 8;
                } else if (this.velocity.x < 0) {
                    this.x = entity.boundingBox.right - 8;
                }

                this.velocity.x = 0;
                this.boundingBox.update(this.x + 8, this.y + 4);
            }
        }
    }

    handleVerticalCollisions() {
        this.onGround = false;

        for (const entity of this.game.entities) {
            if (entity instanceof Spikes || entity instanceof SpikesUD) {
                if (this.boundingBox.collide(entity.boundingBox)) {
                    this.life = false;
                    this.x = 25;
                    this.y = 25;
                    this.velocity = { x: 0, y: 0 };
                    this.boundingBox.update(this.x + 8, this.y + 4);
                }
            }
            if (!(entity instanceof Platform)) continue;

            if (this.boundingBox.collide(entity.boundingBox)) {
                if (this.velocity.y > 0) {
                    this.y = entity.boundingBox.top - this.boundingBox.height - 4;
                    this.velocity.y = 0;
                    this.onGround = true;
                }
                else if (this.velocity.y < 0) {
                    this.y = entity.boundingBox.bottom - 4;
                    this.velocity.y = 0;
                }

                this.boundingBox.update(this.x + 8, this.y + 4);
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