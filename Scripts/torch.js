// 256 x 128

class Torch {
    constructor(game, x = 15, y = 15) {
        this.game = game;
        this.x = x;   
        this.y = y;
        this.animator = new Animator(
            ASSET_MANAGER.getAsset("./Assets/torch.png"),0, 0, 64, 64, 8, 0.08, 0, false, true);
    }

    update() {
       
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5); 
    }
}