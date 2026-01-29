const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./Assets/blocks_prev.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes_UD.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman_idle.png");
ASSET_MANAGER.queueDownload("./Assets/torch.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
   
	gameEngine.addEntity(new Platform(0, 734, 1024, 32));
	gameEngine.addEntity(new Spikes(0, 723, 1024, 15));

    gameEngine.addEntity(new Platform(0, 500, 200, 32));
    gameEngine.addEntity(new Platform(250, 400, 125, 32));
    gameEngine.addEntity(new Platform(400, 550, 96, 32));
    gameEngine.addEntity(new Platform(600, 650, 96, 32));
    gameEngine.addEntity(new Platform(725, 550, 96, 32));
    gameEngine.addEntity(new Platform(874, 450, 150, 32));
    gameEngine.addEntity(new Platform(0, 736, 1024, 32));

	gameEngine.addEntity(new Platform(250, 300, 125, 32));
	gameEngine.addEntity(new SpikesUD(254, 330, 120, 11));

    gameEngine.addEntity(new Caveman(gameEngine));

    gameEngine.addEntity(new Torch(gameEngine, 180, 100));
    gameEngine.addEntity(new Torch(gameEngine, 496, 100));
    gameEngine.addEntity(new Torch(gameEngine, 808, 100));

    gameEngine.init(ctx);
    gameEngine.start();
});