const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./Assets/blocks_prev.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman.png");
ASSET_MANAGER.queueDownload("./Assets/RockBG.png"); 

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    
    const bgImg = ASSET_MANAGER.getAsset("./Assets/RockBG.png");
    gameEngine.addEntity(new Background(bgImg));

    // Add other entities
    gameEngine.addEntity(new Platform(0, 300, 300, 20));
    gameEngine.addEntity(new Platform(0, 718, 1024, 50));
    gameEngine.addEntity(new Caveman(gameEngine));

    gameEngine.init(ctx);
    gameEngine.start();

    window.addEventListener("resize", () => {
        resizeCanvas(canvas, ctx);
    });
});
