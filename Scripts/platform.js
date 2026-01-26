class Platform {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
    }

    update() {
        // Platforms do not move
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
