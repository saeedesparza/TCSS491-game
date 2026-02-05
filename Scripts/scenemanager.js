class SceneManager {
    constructor(game) {
        this.game = game;
        this.currentLevel = 0;
        this._queued = false;
    }

    clearEntities() {
        this.game.entities = [];
    }

    loadTutorialLevel() {
        this.clearEntities();

        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Spikes(0, 723, 1024, 15));

        this.game.addEntity(new Platform(0, 500, 200, 32));
        this.game.addEntity(new Platform(250, 400, 125, 32));

        this.game.addEntity(new FakePlatform(650, 650, 96, 32));
 
        this.game.addEntity(new MovingPlatform(this.game, 400, 550, 96, 32, 0, 100));

        this.game.addEntity(new Platform(755, 550, 6, 32));
        this.game.addEntity(new Platform(874, 450, 150, 32));
        this.game.addEntity(new Platform(0, 736, 1024, 32));

        this.game.addEntity(new Platform(250, 300, 125, 32));
        this.game.addEntity(new SpikesUD(254, 330, 120, 11));

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        // Right border split to create vertical gap between y=400 and y=450
        this.game.addEntity(new Border(1023, 0, 1, 400)); // Right border top
        this.game.addEntity(new Border(1023, 450, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        // Vaughn this is passing the code to the scene manager so keep an eye on this
        this.game.addEntity(new Caveman(this.game, this));
        gameEngine.addEntity(new Torch(gameEngine, 58, 60));
        gameEngine.addEntity(new Torch(gameEngine, 470, 60));
        gameEngine.addEntity(new Torch(gameEngine, 870, 60));
    }

    loadNewLevel() {
        this.clearEntities();

        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Spikes(200, 723, 200, 15));

        this.game.addEntity(new Platform(20, 680, 80, 32));
        this.game.addEntity(new Platform(100, 640, 120, 32));
        this.game.addEntity(new Platform(260, 600, 140, 32));
        this.game.addEntity(new Platform(460, 560, 140, 32));
        this.game.addEntity(new Platform(700, 520, 150, 32));

        this.game.addEntity(new Platform(850, 420, 100, 32));

        this.game.addEntity(new SpikesUD(470, 520, 40, 11));

        const cav = new Caveman(this.game, this);
        cav.x = 30;
        cav.y = 646;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        // Right border split to create vertical gap between y=400 and y=450
        this.game.addEntity(new Border(1023, 0, 1, 400)); // Right border top
        this.game.addEntity(new Border(1023, 450, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        this.game.addEntity(new Torch(this.game, 40, 640));
        this.game.addEntity(new Torch(this.game, 300, 560));
        this.game.addEntity(new Torch(this.game, 760, 480));
    }

    nextLevel() {
        if (!this._queued) {
            this._queued = true;
            console.log("Level transition queued");
        }
    }

    resetMovingPlatforms() {
        for (const entity of this.game.entities) {
            if (entity instanceof MovingPlatform) {
                entity.reset();
            }
        }
    }

    nextLevelImmediate() {
        this.currentLevel++;
        console.log("Loading level", this.currentLevel);
        if (this.currentLevel === 1) {
            this.loadNewLevel();
        } else {
            // loops back to tutorial level
            this.loadTutorialLevel();
        }
        this._queued = false;
    }
}