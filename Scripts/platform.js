class Platform {
    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // 96x32 spritesheet, tiles are 32x32
        this.tileSize = 32;
        this.tileIndex = tileIndex;

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blocks_prev.png");
    }

    update() {
        // static platform
    }

    draw(ctx) {
        const tilesAcross = Math.ceil(this.width / this.tileSize);

        for (let i = 0; i < tilesAcross; i++) {
            ctx.drawImage(
                this.spritesheet,
                this.tileIndex * this.tileSize, 0, // source X,Y
                this.tileSize, this.tileSize,      // source W,H
                this.x + i * this.tileSize, this.y, // dest X,Y
                this.tileSize, this.tileSize        // dest W,H
            );
        }
    }
}