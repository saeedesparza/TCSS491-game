class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) {
            frame = this.frameCount - frame - 1;
        }

        const columns = Math.floor(this.spritesheet.width / this.width);

        const col = frame % columns;
        const row = Math.floor(frame / columns);

        const sx = this.xStart + col * (this.width + this.framePadding);
        const sy = this.yStart + row * (this.height + this.framePadding);

        ctx.drawImage(
            this.spritesheet,
            sx, sy,                 // source x, y
            this.width, this.height, // source width, height
            x, y,                   // destination x, y
            this.width * scale,
            this.height * scale
        );
    }


    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};