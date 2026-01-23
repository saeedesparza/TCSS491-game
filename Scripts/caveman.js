class Caveman {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./Assets/spritesheet_caveman.png"), 0, 0, 32, 32, 16, 0.05, 0, false, true);
    };

    update() {
        
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 25, 25, 4);
    }
}