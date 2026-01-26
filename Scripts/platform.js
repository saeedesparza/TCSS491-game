class Platform {
    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileSize = 32;
        this.tileIndex = tileIndex;

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blocks_prev.png");
    }

    update() {

    }

    draw(ctx) {
        const tilesAcross = Math.ceil(this.width / this.tileSize);

        for (let i = 0; i < tilesAcross; i++) {
            ctx.drawImage(
                this.spritesheet,
                this.tileIndex * this.tileSize, 0,
                this.tileSize, this.tileSize,
                this.x + i * this.tileSize, this.y,
                this.tileSize, this.tileSize
            );
        }
    }
}