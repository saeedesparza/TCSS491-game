const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./Assets/blocks_prev.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");


   
	gameEngine.addEntity(new Platform(0, 734, 1024, 1000));
	gameEngine.addEntity(new Spikes(0, 723, 1024, 1000));

    gameEngine.addEntity(new Platform(0, 500, 200, 20));
    gameEngine.addEntity(new Platform(250, 400, 125, 20));
    gameEngine.addEntity(new Platform(400, 550, 75, 20));
    gameEngine.addEntity(new Platform(600, 650, 75, 20));
    gameEngine.addEntity(new Platform(725, 550, 75, 20));
    gameEngine.addEntity(new Platform(874, 450, 150, 20));
    gameEngine.addEntity(new Platform(0, 736, 1024, 50));

    gameEngine.addEntity(new Caveman(gameEngine));

    gameEngine.init(ctx);
    gameEngine.start();

    window.addEventListener("resize", () => {
        resizeCanvas(canvas, ctx);
    });
});