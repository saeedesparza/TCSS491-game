const gameEngine = new GameEngine();
gameEngine.options.showBoundingBoxes = true; // commented out to disable bounding-box overlay
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

    // Show menu overlay at start
    sceneManager.showMenu();

    // Prevent game from starting until Start is clicked
    let gameStarted = false;

    // Button event listeners
    document.getElementById('startGameBtn').onclick = function() {
        if (!gameStarted) {
            sceneManager.hideMenu();
            sceneManager.loadTutorialLevel();
            gameEngine.init(ctx);
            gameEngine.start();
            gameStarted = true;
        }
    };
    document.getElementById('quitGameBtn').onclick = function() {
        window.close();
        // If window.close() fails (most browsers), just hide the menu and freeze
        sceneManager.hideMenu();
        canvas.style.display = 'none';
        document.body.innerHTML = '<h1 style="color:white;text-align:center;margin-top:20vh;">Thanks for playing!</h1>';
        document.body.style.background = '#111';
    };
});