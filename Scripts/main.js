const gameEngine = new GameEngine();
gameEngine.options.showBoundingBoxes = true;
const ASSET_MANAGER = new AssetManager();

// Change this number to spawn in a different level (1 through 6)
const STARTING_LEVEL = 7;


ASSET_MANAGER.queueDownload("./Assets/blocks_prev.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman_idle.png");
ASSET_MANAGER.queueDownload("./Assets/torch.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes.png");
ASSET_MANAGER.queueDownload("./Assets/Spikes_UD.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    if (!canvas) {
        console.error("Canvas #gameWorld not found.");
        return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Could not get 2D context for #gameWorld.");
        return;
    }

    const sceneManager = new SceneManager(gameEngine);

    gameEngine.sceneManager = sceneManager;

    switch (STARTING_LEVEL) {
        case 1:
            sceneManager.loadLevel1();
            break;
        case 2:
            sceneManager.loadLevel2();
            break;
        case 3:
            sceneManager.loadLevel3();
            break;
        case 4:
            sceneManager.loadLevel4();
            break;
        case 5:
            sceneManager.loadLevel5();
            break;
        case 6:
            sceneManager.loadLevel6();
            break;
        case 7:
            sceneManager.loadLevel7();
            break;
        default:
            console.warn(`Invalid STARTING_LEVEL (${STARTING_LEVEL}); defaulting to level 1.`);
            sceneManager.loadLevel1();
            break;
    }

    gameEngine.init(ctx);
    gameEngine.start();

    if (typeof resizeCanvas === "function") {
        window.addEventListener("resize", () => {
            resizeCanvas(canvas, ctx);
        });
    }
});