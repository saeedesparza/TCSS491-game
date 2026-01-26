class Background {
    constructor(img) {
        this.img = img; // Pass in preloaded image from main.js
    }

    update() {
        // Static background
    }

    draw(ctx) {
        ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}
