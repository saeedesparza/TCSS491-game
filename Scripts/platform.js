class Platform {
    constructor(x, y, width, height) {
        this.animator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/blocks_prev.png"),
            0, 0, 32, 32, 16, 0.034, 0, true, true
        );
    }

    update() {
        // Platforms do not move
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
