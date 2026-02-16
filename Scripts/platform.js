class Platform {
    static COYOTE_PIXELS = 10; // 10px extension on each side

    constructor(x, y, width, height, tileIndex = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.tileSize = 32;
        this.tileIndex = tileIndex;

        // Bounding box matches the specified platform dimensions by default.
        // `bboxPad` extends the collision box on both left and right sides.
        this.bboxPad = Platform.COYOTE_PIXELS; // set >0 to extend collision area
        this.updateBoundingBox();

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blocks_prev.png");
    }

    // Recompute the bounding box using current position/size and bboxPad.
    updateBoundingBox() {
        // Create a new BoundingBox sized with coyote/pad on left and right
        this.boundingBox = new BoundingBox(
            this.x - this.bboxPad,
            this.y,
            this.width + this.bboxPad * 2,
            this.height
        );
    }

    // Keep update refreshing bounding box in case the platform moves or padding changes.
    update() {
        this.updateBoundingBox();
    }

    // Optional helper if you need a plain rect object instead of a BoundingBox instance
    getCollisionRect() {
        return {
            x: this.x - this.bboxPad,
            y: this.y,
            width: this.width + this.bboxPad * 2,
            height: this.height
        };
    }

    // Allow changing the pad at runtime if needed
    setBBoxPad(pixels) {
        this.bboxPad = pixels;
        this.updateBoundingBox();
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