class SpikesUD {
    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileSize = 15;
        this.tileIndex = tileIndex;

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Spikes_UD.png");
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {
        this.boundingBox.update(this.x, this.y);
    }

    draw(ctx) {
        const tilesAcross = Math.ceil(this.width / this.tileSize);

        for (let i = 0; i < tilesAcross; i++) {
            const remainingWidth = this.width - i * this.tileSize;
            const drawWidth = Math.min(this.tileSize, remainingWidth);
            if (drawWidth <= 0) break;

            ctx.drawImage(
                this.spritesheet,
                this.tileIndex * this.tileSize, 0,
                drawWidth, this.tileSize,
                this.x + i * this.tileSize, this.y,
                drawWidth, this.tileSize
            );
        }
    }
}