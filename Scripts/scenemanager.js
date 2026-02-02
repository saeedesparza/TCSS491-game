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
        this.game.addEntity(new Platform(400, 550, 96, 32));
        this.game.addEntity(new Platform(600, 650, 96, 32));
        this.game.addEntity(new Platform(725, 550, 96, 32));
        this.game.addEntity(new Platform(874, 450, 150, 32));
        this.game.addEntity(new Platform(0, 736, 1024, 32));

        this.game.addEntity(new Platform(250, 300, 125, 32));
        this.game.addEntity(new SpikesUD(254, 330, 120, 11));

        // Vaughn this is passing the code to the scene manager so keep an eye on this
        this.game.addEntity(new Caveman(this.game, this));

        this.game.addEntity(new Torch(this.game, 180, 100));
        this.game.addEntity(new Torch(this.game, 496, 100));
        this.game.addEntity(new Torch(this.game, 808, 100));
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