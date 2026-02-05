const gameEngine = new GameEngine();
// gameEngine.options.showBoundingBoxes = true; // commented out to disable bounding-box overlay
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

    const sceneManager = new SceneManager(gameEngine);

    gameEngine.sceneManager = sceneManager;
    sceneManager.loadTutorialLevel();

    gameEngine.init(ctx);
    gameEngine.start();
});