class SpikesRight {
    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileSize = 15;
        this.tileIndex = tileIndex;

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Spikes_UD.png");
        this.spikeWidth = 12;
        this.boundingBox = new BoundingBox(this.x, this.y, this.spikeWidth, this.height);
    }

    update() {
        this.boundingBox.update(this.x, this.y);
    }

    draw(ctx) {
        const tilesDown = Math.ceil(this.height / this.tileSize);

        for (let i = 0; i < tilesDown; i++) {
            const drawX = this.x;
            const drawY = this.y + i * this.tileSize;
            const remainingHeight = this.height - i * this.tileSize;
            const drawHeight = Math.min(this.tileSize, remainingHeight);
            if (drawHeight <= 0) break;

            ctx.save();
            ctx.beginPath();
            ctx.rect(drawX, drawY, this.spikeWidth, drawHeight);
            ctx.clip();
            ctx.translate(drawX, drawY);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(
                this.spritesheet,
                this.tileIndex * this.tileSize, 0,
                this.tileSize, this.tileSize,
                0, -this.tileSize,
                this.tileSize, this.tileSize
            );
            ctx.restore();
        }
    }
}

class SpikesLeft {
    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileSize = 15;
        this.tileIndex = tileIndex;

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Spikes_UD.png");
        this.spikeWidth = 12;
        this.boundingBox = new BoundingBox(this.x, this.y, this.spikeWidth, this.height);
    }

    update() {
        this.boundingBox.update(this.x, this.y);
    }

    draw(ctx) {
        const tilesDown = Math.ceil(this.height / this.tileSize);

        for (let i = 0; i < tilesDown; i++) {
            const drawX = this.x;
            const drawY = this.y + i * this.tileSize;
            const remainingHeight = this.height - i * this.tileSize;
            const drawHeight = Math.min(this.tileSize, remainingHeight);
            if (drawHeight <= 0) break;

            ctx.save();
            ctx.beginPath();
            ctx.rect(drawX, drawY, this.spikeWidth, drawHeight);
            ctx.clip();
            ctx.translate(drawX, drawY);
            ctx.rotate(-Math.PI / 2);
            ctx.drawImage(
                this.spritesheet,
                this.tileIndex * this.tileSize, 0,
                this.tileSize, this.tileSize,
                -this.tileSize, 0,
                this.tileSize, this.tileSize
            );
            ctx.restore();
        }
    }
}
