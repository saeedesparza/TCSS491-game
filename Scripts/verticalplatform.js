class VerticalPlatform {
    constructor(x, y, width, height, tileIndex = 0, direction = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileSize = 32;
        this.tileIndex = tileIndex;
        this.direction = direction >= 0 ? 1 : -1;

        this.bboxOffsetX = this.direction === -1 ? -this.width : 0;
        this.boundingBox = new BoundingBox(
            this.x + this.bboxOffsetX,
            this.y,
            this.width,
            this.height
        );
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blocks_prev.png");
    }

    update() {
        this.boundingBox.update(this.x + this.bboxOffsetX, this.y);
    }

    draw(ctx) {
        const tilesDown = Math.ceil(this.height / this.tileSize);

        for (let i = 0; i < tilesDown; i++) {
            const remainingHeight = this.height - i * this.tileSize;
            const drawHeight = Math.min(this.tileSize, remainingHeight);
            if (drawHeight <= 0) break;

            const drawX = this.x;
            const drawY = this.y + i * this.tileSize;

            ctx.save();
            ctx.translate(drawX, drawY);
            ctx.rotate((Math.PI / 2) * this.direction);
            ctx.drawImage(
                this.spritesheet,
                this.tileIndex * this.tileSize, 0,
                this.tileSize, this.tileSize,
                0, -this.tileSize,
                this.tileSize, drawHeight
            );
            ctx.restore();
        }
    }
}
