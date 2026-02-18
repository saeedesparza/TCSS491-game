const gameEngine = new GameEngine();
gameEngine.options.showBoundingBoxes = true;
const ASSET_MANAGER = new AssetManager();

// Change this number to spawn in a different level (1 through 6)
const STARTING_LEVEL = 6;


ASSET_MANAGER.queueDownload("./Assets/blocks_prev.png");
ASSET_MANAGER.queueDownload("./Assets/spritesheet_caveman.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    gameEngine.addEntity(new Platform(0, 500, 200, 20));
    gameEngine.addEntity(new Platform(250, 400, 125, 20));
    gameEngine.addEntity(new Platform(400, 550, 75, 20));
    gameEngine.addEntity(new Platform(600, 650, 75, 20));
    gameEngine.addEntity(new Platform(725, 550, 75, 20));
       gameEngine.addEntity(new Platform(874, 450, 150, 20));
    gameEngine.addEntity(new Platform(0, 736, 1024, 50));
    gameEngine.addEntity(new Caveman(gameEngine));
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
    }else if (STARTING_LEVEL === 6) {
        sceneManager.loadLevel6();
    }

    gameEngine.init(ctx);
    gameEngine.start();

    window.addEventListener("resize", () => {
        resizeCanvas(canvas, ctx);
    });
});
