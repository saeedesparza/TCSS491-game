class Platform {
    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileSize = 32;
        this.tileIndex = tileIndex;

        // Bounding box matches the specified platform dimensions
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blocks_prev.png");
    }

    update() {

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