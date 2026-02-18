const gameEngine = new GameEngine();
gameEngine.options.showBoundingBoxes = true;
const ASSET_MANAGER = new AssetManager();

// Change this number to spawn in a different level (1, 2, or 3)
const STARTING_LEVEL = 5;


ASSET_MANAGER.queueDownload("./Assets/blocks_prev.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes_UD.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman_idle.png");
ASSET_MANAGER.queueDownload("./Assets/torch.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    const sceneManager = new SceneManager(gameEngine);

    gameEngine.sceneManager = sceneManager;
    
    if (STARTING_LEVEL === 1) {
        sceneManager.loadLevel1();
    } else if (STARTING_LEVEL === 2) {
        sceneManager.loadLevel2();
    } else if (STARTING_LEVEL === 3) {
        sceneManager.loadLevel3();
    }else if (STARTING_LEVEL === 4) {
        sceneManager.loadLevel4();
    }else if (STARTING_LEVEL === 5) {
        sceneManager.loadLevel5();
    }

    gameEngine.init(ctx);
    gameEngine.start();
});