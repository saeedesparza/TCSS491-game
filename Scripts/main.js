const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./Assets/blocks_prev.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    gameEngine.addEntity(new Platform(0, 300, 300, 20));
    gameEngine.addEntity(new Platform(0, 736, 1024, 50));
    gameEngine.addEntity(new Caveman(gameEngine));

    gameEngine.init(ctx);
    gameEngine.start();

    window.addEventListener("resize", () => {
        resizeCanvas(canvas, ctx);
    });
});