class SceneManager {
    constructor(game) {
        this.game = game;
        this.currentLevel = 0;
        this._queued = false;
    }

    clearEntities() {
        this.game.entities = [];
    }

    loadLevel1() {
        this.clearEntities();

        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Spikes(0, 723, 1024, 15));

        this.game.addEntity(new Platform(0, 500, 200, 32));
        this.game.addEntity(new Platform(250, 400, 125, 32));

        this.game.addEntity(new FakePlatform(650, 650, 96, 32));
 
        this.game.addEntity(new MovingPlatform(this.game, 400, 550, 96, 32, 0, 100));

        this.game.addEntity(new Platform(755, 550, 30, 32));
        this.game.addEntity(new Platform(874, 450, 150, 32));
        this.game.addEntity(new Platform(0, 736, 1024, 32));

        this.game.addEntity(new Platform(250, 300, 125, 32));
        this.game.addEntity(new SpikesUD(254, 330, 120, 11));//330

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        // Right border split to create vertical gap between y=400 and y=450
        this.game.addEntity(new Border(1023, 0, 1, 400)); // Right border top
        this.game.addEntity(new Border(1023, 450, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        // Vaughn this is passing the code to the scene manager so keep an eye on this
        const cav = new Caveman(this.game, this);
        cav.x = 25;
        cav.y = 455;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel2() {
        this.clearEntities();
        this.game.addEntity(new Spikes(169, 723, 855, 15));
        this.game.addEntity(new Platform(0, 734, 1024, 32));

        this.game.addEntity(new Platform(0, 650, 115, 32));
        this.game.addEntity(new SpikesLeft(115, 650, 15, 30));
        this.game.addEntity(new Platform(150, 550, 30, 32));


        this.game.addEntity(new Platform(0, 450, 115, 32));
        this.game.addEntity(new SpikesLeft(115, 450, 15, 30));
        this.game.addEntity(new Platform(150, 350, 30, 32));

        this.game.addEntity(new Platform(0, 250, 115, 32));
        this.game.addEntity(new SpikesLeft(115, 250, 15, 30));
        this.game.addEntity(new Platform(325, 350, 30, 32));
        this.game.addEntity(new FakePlatform(250, 250, 30, 32));


        this.game.addEntity(new MovingPlatform(this.game, 450, 350, 30, 32, 0, 62));

        this.game.addEntity(new Platform(0, 450, 0, 32));
        this.game.addEntity(new Platform(0, 736, 0, 32));

        this.game.addEntity(new Platform(700, 430, 30, 32));
        this.game.addEntity(new Platform(824, 350, 200, 32));



        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 350, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border





        const cav = new Caveman(this.game, this);
        cav.x = 25;//25
        cav.y = 689;//689
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }
    loadLevel3() {
        this.clearEntities();
        this.game.addEntity(new Spikes(0, 723, 1024, 15));
        this.game.addEntity(new Platform(0, 734, 1024, 32));

        this.game.addEntity(new Platform(0, 150, 115, 32));
        this.game.addEntity(new Platform(0, 250, 115, 32));
        this.game.addEntity(new Platform(0, 350, 115, 32));
        this.game.addEntity(new Platform(0, 450, 115, 32));
        this.game.addEntity(new FakePlatform(0, 550, 115, 32));
        this.game.addEntity(new Platform(175, 650, 115, 32));


        this.game.addEntity(new VerticalPlatform(165, 0, 32, 425, 0, 1));
        this.game.addEntity(new SpikesRight(150, 0, 15, 425));
        this.game.addEntity(new Platform(0, 450, 115, 32));


        this.game.addEntity(new Platform(400, 600, 115, 32));
        this.game.addEntity(new Spikes(410, 590, 90, 15));

        this.game.addEntity(new Platform(598, 500, 115, 32));
        this.game.addEntity(new Spikes(610, 490, 90, 15));

        this.game.addEntity(new Platform(824, 435, 200, 32));




        
        
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 435, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border





        const cav = new Caveman(this.game, this);
        cav.x = 25;//25
        cav.y = 105;//105
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel4() {
        this.clearEntities();

        // TODO: build level 4 layout here
        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Spikes(0, 719, 1000, 15));

        this.game.addEntity(new MovingPlatform(this.game, 300, 400, 30, 32, 0, 50));
        
        this.game.addEntity(new MovingPlatform(this.game, 450, 400, 30, 32, 0, 62));
        this.game.addEntity(new MovingPlatform(this.game, 600, 400, 30, 32, 0, 62));
        this.game.addEntity(new MovingPlatform(this.game, 750, 400, 30, 32, 0, 62));
        

        this.game.addEntity(new Platform(0, 400, 200, 32));
        
        this.game.addEntity(new Platform(974, 400, 125, 32));
        this.game.addEntity(new SpikesUD(974, 434, 125, 11));

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 0, 1, 650)); // Right border top
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 25;//25
        cav.y = 355;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel5() {
        this.clearEntities();

        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Spikes(0, 723, 1024, 15));

        
        this.game.addEntity(new Platform(0, 400, 125, 32));
        this.game.addEntity(new FakePlatform(200, 400, 100, 32));

        this.game.addEntity(new Spikes(200, 488, 75, 15));
        this.game.addEntity(new Platform(200, 500, 100, 32));
        
        this.game.addEntity(new MovingPlatform(this.game, 400, 450, 30, 32, 0, 45));

        this.game.addEntity(new MovingPlatform(this.game, 585, 450, 100, 32, 0, 45));

        this.game.addEntity(new Spikes(665, 436, 20, 15));
        this.game.addEntity(new Platform(200, 500, 100, 32))

       // this.game.addEntity(new FakePlatform(800, 450, 30, 32));
        this.game.addEntity(new Platform(869, 400, 155, 32));

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 0, 1, 400)); // Right border top
        this.game.addEntity(new Border(1023, 450, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 25;//25
        cav.y = 355;//355
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel6() {
        this.clearEntities();

        // TODO: build level 6 layout here
        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Platform(0, 634, 800, 32));
       
        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 0, 1, 400)); // Right border top
        this.game.addEntity(new Border(1023, 450, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 90;//90
        cav.y = 689;//689
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
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
            this.loadLevel2();
        } else if (this.currentLevel === 2) {
            this.loadLevel3();
        } else if (this.currentLevel === 3) {
            this.loadLevel4();
        } else if (this.currentLevel === 4) {
            this.loadLevel5();
        } else if (this.currentLevel === 5) {
            this.loadLevel6();
        } else {
            // loops back to level 1
            this.currentLevel = 0;
            this.loadLevel1();
        }
        this._queued = false;
    }
}