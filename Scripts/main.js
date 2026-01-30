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
   
	
	gameEngine.addEntity(new Border(0, 0, 1024, 1));      
	gameEngine.addEntity(new Border(0, 0, 1, 768));       
	gameEngine.addEntity(new Border(1023, 0, 1, 768));    
	gameEngine.addEntity(new Border(0, 767, 1024, 1));    

	gameEngine.addEntity(new Platform(0, 734, 1024, 32));
	gameEngine.addEntity(new Spikes(0, 723, 1024, 15));

    gameEngine.addEntity(new Platform(0, 500, 200, 32));
    gameEngine.addEntity(new Platform(250, 400, 125, 32));
    gameEngine.addEntity(new Platform(400, 550, 96, 32));
    gameEngine.addEntity(new Platform(600, 650, 96, 32));
    gameEngine.addEntity(new Platform(725, 550, 96, 32));
    gameEngine.addEntity(new Platform(874, 450, 150, 32));
    gameEngine.addEntity(new Platform(0, 736, 1024, 32));

	gameEngine.addEntity(new Platform(250, 294, 125, 32));
	gameEngine.addEntity(new SpikesUD(254, 324, 120, 11));
    

    gameEngine.addEntity(new Caveman(gameEngine));

    gameEngine.addEntity(new Torch(gameEngine, 113, 18));
    gameEngine.addEntity(new Torch(gameEngine, 470, 18));
    gameEngine.addEntity(new Torch(gameEngine, 870, 18));

    gameEngine.init(ctx);
    gameEngine.start();
});