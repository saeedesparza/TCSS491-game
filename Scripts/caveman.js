class Caveman {
    constructor() {
        this.game = game;
        this.animator() = new Animator(ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman.png"), 0, 0, 32, 32, 4, 0.2, 0, true, true);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 25, 25, 2);
    }
}