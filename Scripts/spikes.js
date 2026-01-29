class Spikes {
    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileWidth = 15;
        this.tileHeight = 11;
        this.tileIndex = tileIndex;

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Spikes.png");
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.tileHeight);
    }

    update() {
        this.boundingBox.update(this.x, this.y);
    }

    draw(ctx) {
        const tilesAcross = Math.ceil(this.width / this.tileWidth);

        for (let i = 0; i < tilesAcross; i++) {
            ctx.drawImage(
                this.spritesheet,
                this.tileIndex * this.tileWidth, 0,
                this.tileWidth, this.tileHeight,
                this.x + i * this.tileWidth, this.y,
                this.tileWidth, this.tileHeight
            );
        }
    }
}