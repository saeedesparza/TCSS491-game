class Background {
    constructor(game) {
        this.game = game;
        this.bg = ASSET_MANAGER.getAsset("./Assets/RockBG.png");
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}
