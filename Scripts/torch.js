// 256 x 128

class Torch {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./Assets/torch.png"), 0, 0, 64, 64, 8, 0.08, 0, false, true);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 25, 25, 4);
    }
}