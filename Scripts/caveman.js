class Caveman {
    constructor(game) {
        this.game = game;

        this.x = 25;
        this.y = 25;
        this.facing = -1;

        this.speed = 800;

        this.animator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman.png"),
            0, 0, 32, 32, 16, 0.1, 0, false, true
        );
    }

    update() {
        let dx = 0;
        let dy = 0;

        if (this.game.isKeyPressed("a")) {
            dx -= 1;
            this.facing = 1;
        }

        if (this.game.isKeyPressed("d")) {
            dx += 1;
            this.facing = -1;
        }

        if (this.game.isKeyPressed("w")) dy -= 1;
        if (this.game.isKeyPressed("s")) dy += 1;

        const len = Math.hypot(dx, dy);
        if (len > 0) {
            dx /= len;
            dy /= len;
        }

        const dt = this.game.clockTick;
        this.x += dx * this.speed * dt;
        this.y += dy * this.speed * dt;

        const canvas = this.game.ctx.canvas;
        const spriteSize = 32 * 4;
        this.x = Math.max(0, Math.min(this.x, canvas.width - spriteSize));
        this.y = Math.max(0, Math.min(this.y, canvas.height - spriteSize));
    }

    draw(ctx) {
        ctx.save();

        const scale = 4;
        const spriteWidth = 32 * scale;

        if (this.facing === -1) {
            ctx.scale(-1, 1);

            this.animator.drawFrame(
                this.game.clockTick,
                ctx,
                -this.x - spriteWidth,
                this.y,
                scale
            );
        } else {
            this.animator.drawFrame(
                this.game.clockTick,
                ctx,
                this.x,
                this.y,
                scale
            );
        }

        ctx.restore();
    }
}