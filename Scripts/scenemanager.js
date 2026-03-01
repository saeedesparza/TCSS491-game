class SceneManager {
    constructor(game) {
        this.game = game;
        this.currentLevel = 0;
        this._queued = false;
        this._reloadQueued = false;
        this.isGameComplete = false;
    }

    completeGame() {
        this.isGameComplete = true;
        this._queued = false;
        this._reloadQueued = false;
        this.clearEntities();

        if (typeof window !== "undefined" && typeof window.showEndScreen === "function") {
            window.showEndScreen();
        }
    }

    clearEntities() {
        this.game.entities = [];
    }

    restartGame() {
        this.isGameComplete = false;
        this._queued = false;
        this._reloadQueued = false;
        this.loadLevel1();
    }

    loadLevel1() {
        this.isGameComplete = false;
        this.currentLevel = 0;
        this.clearEntities();

        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Spikes(0, 723, 1024, 15));

        this.game.addEntity(new Platform(0, 500, 220, 32));
        this.game.addEntity(new Platform(250, 400, 125, 32));

        this.game.addEntity(new FakePlatform(650, 650, 96, 32));
 
        this.game.addEntity(new MovingPlatform(this.game, 400, 550, 96, 32, 0, 100)); //REVISE THIS

        this.game.addEntity(new Platform(755, 550, 30, 32));
        this.game.addEntity(new Platform(874, 450, 150, 32));
        this.game.addEntity(new Platform(0, 736, 1024, 32));

        this.game.addEntity(new Platform(250, 300, 125, 32));
        this.game.addEntity(new SpikesUD(254, 330, 120, 11));//330

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        // Right border split to create vertical gap between y=400 and y=450
        this.game.addEntity(new Border(1023, 0, 1, 0)); // Right border top
        this.game.addEntity(new Border(1023, 450, 1, 318)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 25;
        cav.y = 450;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel2() {
        this.currentLevel = 1;
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
        cav.y = 686;//689
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }
    loadLevel3() {
        this.currentLevel = 2;
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
        this.game.addEntity(new SpikesRight(154, 0, 15, 425));
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
        cav.x = 25;
        cav.y = 102;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel4() {
        this.currentLevel = 3;
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
        cav.y = 352;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel5() {
        this.currentLevel = 4;
        this.clearEntities();

        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Spikes(0, 723, 1024, 15));

        this.game.addEntity(new Platform(0, 400, 125, 32));
        this.game.addEntity(new FakePlatform(200, 400, 100, 32));

        this.game.addEntity(new Spikes(200, 488, 90, 15));
        this.game.addEntity(new Platform(200, 500, 100, 32));
        
        this.game.addEntity(new MovingPlatform(this.game, 400, 450, 30, 32, 0, 62));

        this.game.addEntity(new MovingPlatform(this.game, 585, 450, 100, 32, 0, 45));

        this.game.addEntity(new Spikes(665, 436, 20, 15));
        this.game.addEntity(new Platform(200, 500, 100, 32))

       // this.game.addEntity(new FakePlatform(800, 450, 30, 32));
        this.game.addEntity(new Platform(869, 400, 155, 32));

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 500, 1, 268)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 25;
        cav.y = 350;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel6() {
        this.currentLevel = 5;
        this.clearEntities();

        // first run 
        this.game.addEntity(new Platform(0, 734, 1024, 32));

        this.game.addEntity(new Platform(0, 634, 800, 32));
        this.game.addEntity(new Spikes(200, 622, 8, 15));
        this.game.addEntity(new Spikes(270, 622, 8, 15));
        this.game.addEntity(new Spikes(340, 622, 8, 15));
        this.game.addEntity(new Spikes(410, 622, 8, 15));
        this.game.addEntity(new Spikes(480, 622, 8, 15));
        this.game.addEntity(new Spikes(550, 622, 8, 15));
        this.game.addEntity(new Spikes(620, 622, 8, 15));
        this.game.addEntity(new Spikes(690, 622, 8, 15));
        this.game.addEntity(new Spikes(760, 622, 8, 15));
        // second run 
        this.game.addEntity(new Platform(224, 520, 800, 32));
        this.game.addEntity(new Spikes(824, 508, 8, 15));
        this.game.addEntity(new Spikes(754, 508, 8, 15));
        this.game.addEntity(new Spikes(684, 508, 8, 15));
        this.game.addEntity(new Spikes(614, 508, 8, 15));
        this.game.addEntity(new Spikes(544, 508, 8, 15));
        this.game.addEntity(new Spikes(474, 508, 8, 15));   
        this.game.addEntity(new Spikes(404, 508, 8, 15));
        this.game.addEntity(new Spikes(334, 508, 8, 15));
        this.game.addEntity(new Spikes(294, 508, 8, 15));
        this.game.addEntity(new Spikes(250, 508, 8, 15));
        // third run 
        this.game.addEntity(new Platform(0, 396, 800, 32));
        this.game.addEntity(new Spikes(200, 384, 8, 15));
        this.game.addEntity(new Spikes(270, 384, 8, 15));
        this.game.addEntity(new Spikes(340, 384, 8, 15));
        this.game.addEntity(new Spikes(410, 384, 8, 15));
        this.game.addEntity(new Spikes(480, 384, 8, 15));
        this.game.addEntity(new Spikes(550, 384, 8, 15));
        this.game.addEntity(new Spikes(620, 384, 8, 15));
        this.game.addEntity(new Spikes(690, 384, 8, 15));
        this.game.addEntity(new Spikes(760, 384, 8, 15));
         // fourth run 
        this.game.addEntity(new Platform(224, 272, 800, 32));
        this.game.addEntity(new Spikes(824, 260, 8, 15));
        this.game.addEntity(new Spikes(754, 260, 8, 15));
        this.game.addEntity(new Spikes(684, 260, 8, 15));
        this.game.addEntity(new Spikes(614, 260, 8, 15));
        this.game.addEntity(new Spikes(544, 260, 8, 15));
        this.game.addEntity(new Spikes(474, 260, 8, 15));   
        this.game.addEntity(new Spikes(404, 260, 8, 15));
        this.game.addEntity(new Spikes(334, 260, 8, 15));
        this.game.addEntity(new Spikes(294, 260, 8, 15));
        this.game.addEntity(new Spikes(250, 260, 8, 15));

         // final run 
        this.game.addEntity(new Platform(0, 148, 800, 32));
        this.game.addEntity(new Spikes(200, 136, 8, 15));
        this.game.addEntity(new Spikes(270, 136, 8, 15));
        this.game.addEntity(new Spikes(340, 136, 8, 15));
        this.game.addEntity(new Spikes(410, 136, 8, 15));
        this.game.addEntity(new Spikes(480, 136, 8, 15));
        this.game.addEntity(new Spikes(550, 136, 8, 15));
        this.game.addEntity(new Spikes(620, 136, 8, 15));
        this.game.addEntity(new Spikes(690, 136, 8, 15));
        this.game.addEntity(new Spikes(760, 136, 8, 15));

        this.game.addEntity(new Spikes(874, 720, 150, 15));


        this.game.addEntity(new Platform(0, 550, 150, 32));
        this.game.addEntity(new Platform(0, 310, 150, 32));

        this.game.addEntity(new Platform(899, 440, 125, 32));
        this.game.addEntity(new Platform(899, 180, 125, 32));


        
        this.game.addEntity(new Border(0, 150, 1, 468)); // Left border middle segment
        this.game.addEntity(new Border(1023, 0, 1, 768)); // Right border
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 90;//90
        cav.y = 685;//685
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 30));
        this.game.addEntity(new Torch(this.game, 470, 30));
        this.game.addEntity(new Torch(this.game, 870, 30));
    }

    loadLevel7() {
        this.currentLevel = 6;
        this.clearEntities();

        // bottom platforms
        this.game.addEntity(new Platform(0, 734, 224, 32));
        this.game.addEntity(new Spikes(224, 755, 390-224, 15));
        this.game.addEntity(new SpikesRight(447, 630, 15, 100));
        this.game.addEntity(new SpikesLeft(488, 630, 15, 100));
        this.game.addEntity(new Platform(390, 734, 160, 32));
        this.game.addEntity(new Spikes(550, 755, 475, 15));

        // vertical jump platforms
        this.game.addEntity(new Platform(77, 150, 32, 32));
        this.game.addEntity(new Platform(77, 250, 32, 32));
        this.game.addEntity(new Platform(77, 350, 32, 32));
        this.game.addEntity(new Platform(77, 450, 32, 32));
        this.game.addEntity(new Platform(77, 550, 32, 32));
        this.game.addEntity(new Platform(77, 650, 32, 32));

        // left wall with spikes
        this.game.addEntity(new VerticalPlatform(0, 0, 32, 680, 0, 1));
        this.game.addEntity(new SpikesLeft(30, 0, 15, 680));

        // right wall with spikes
        this.game.addEntity(new VerticalPlatform(153, 150, 32, 740, 0, 1));
        this.game.addEntity(new SpikesRight(142, 150, 15, 740));

        // second half post spike wall platforms
        this.game.addEntity(new SpikesUD(556, 582, 30, 8));
        this.game.addEntity(new Platform(555, 550, 32, 32));
        this.game.addEntity(new SpikesUD(556, 682, 30, 8));
        this.game.addEntity(new Platform(555, 650, 32, 32));
        this.game.addEntity(new SpikesUD(556, 782, 30, 8));

        // new platform to traverse towards border
        this.game.addEntity(new Platform(746, 650, 12, 12));
        this.game.addEntity(new Platform(876, 550, 12, 12));
        this.game.addEntity(new Platform(746, 450, 12, 12));
        this.game.addEntity(new Platform(646, 350, 12, 12));
        this.game.addEntity(new Platform(746, 250, 12, 12));
        this.game.addEntity(new Platform(876, 150, 12, 12));
        this.game.addEntity(new MovingPlatform(this.game, 946, 250, 120, 32, 0, 60));

        // borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 255, 1, 900)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 5;
        cav.y = 686;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel8() {
        this.currentLevel = 7;
        this.clearEntities();

        // bottom platforms
        this.game.addEntity(new Platform(0, 734, 50, 32));
        this.game.addEntity(new Spikes(50, 755, 650, 15));
        this.game.addEntity(new Platform(700, 734, 350, 32));

        // upward stairs
        this.game.addEntity(new Platform(146, 650, 12, 12));
        this.game.addEntity(new Platform(276, 550, 12, 12));
        this.game.addEntity(new Platform(406, 450, 12, 12));
        this.game.addEntity(new Platform(536, 350, 12, 12));
        this.game.addEntity(new Platform(666, 250, 12, 12));

        // platform with spikes to force player down spike drop
        this.game.addEntity(new Platform(764, 247, 300, 32));
        this.game.addEntity(new Spikes(764, 235, 300, 15));

        // spike drop left
        this.game.addEntity(new SpikesLeft(676, 280, 15, 30));
        this.game.addEntity(new SpikesLeft(687, 310, 15, 30));
        this.game.addEntity(new SpikesLeft(698, 340, 15, 30));
        this.game.addEntity(new SpikesLeft(709, 370, 15, 30));
        this.game.addEntity(new SpikesLeft(720, 400, 15, 30));
        this.game.addEntity(new SpikesLeft(731, 430, 15, 30));
        this.game.addEntity(new SpikesLeft(742, 460, 15, 30));
        this.game.addEntity(new SpikesLeft(753, 490, 15, 30));
        this.game.addEntity(new SpikesLeft(764, 520, 15, 30));

        // spike drop right
        this.game.addEntity(new SpikesRight(764, 280, 15, 30));
        this.game.addEntity(new SpikesRight(775, 310, 15, 30));
        this.game.addEntity(new SpikesRight(786, 340, 15, 30));
        this.game.addEntity(new SpikesRight(797, 370, 15, 30));
        this.game.addEntity(new SpikesRight(808, 400, 15, 30));
        this.game.addEntity(new SpikesRight(819, 430, 15, 30));
        this.game.addEntity(new SpikesRight(830, 460, 15, 30));
        this.game.addEntity(new SpikesRight(841, 490, 15, 30));
        this.game.addEntity(new SpikesRight(852, 520, 15, 30));

        // spike drop left mirrored
        this.game.addEntity(new SpikesLeft(753, 550, 15, 30));
        this.game.addEntity(new SpikesLeft(742, 580, 15, 30));
        this.game.addEntity(new SpikesLeft(731, 610, 15, 30));
        this.game.addEntity(new SpikesLeft(720, 640, 15, 30));
        this.game.addEntity(new SpikesLeft(709, 670, 15, 30));
        this.game.addEntity(new SpikesLeft(698, 700, 15, 30));

        // spike drop right mirrored
        this.game.addEntity(new SpikesRight(841, 550, 15, 30));
        this.game.addEntity(new SpikesRight(830, 580, 15, 30));
        this.game.addEntity(new SpikesRight(819, 610, 15, 30));
        this.game.addEntity(new SpikesRight(808, 640, 15, 30));
        this.game.addEntity(new SpikesRight(797, 670, 15, 10));

        // borders
        this.game.addEntity(new Border(0, 0, 1, 768)); // Left border
        this.game.addEntity(new Border(1023, 0, 1, 600)); // Right border bottom
        this.game.addEntity(new Border(0, 767, 1024, 1)); // Bottom border
        this.game.addEntity(new Border(0, 0, 1024, 1)); // Top border

        const cav = new Caveman(this.game, this);
        cav.x = 652;
        cav.y = 202;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel9() {
        this.currentLevel = 8;
        this.clearEntities();

        // bottom floor and first platform
        this.game.addEntity(new Platform(0, 90, 100, 32));
        this.game.addEntity(new Spikes(0, 755, 900, 15));

        // upward stairs
        this.game.addEntity(new Platform(256, 550, 3, 12));
        this.game.addEntity(new Platform(416, 550, 3, 12));
        this.game.addEntity(new Platform(576, 550, 3, 12));
        this.game.addEntity(new Platform(736, 550, 3, 12));

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768));
        this.game.addEntity(new Border(1023, 0, 1, 668));
        this.game.addEntity(new Border(0, 767, 1024, 1));
        this.game.addEntity(new Border(0, 0, 1024, 1));

        const cav = new Caveman(this.game, this);
        cav.x = 50;
        cav.y = 0;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    loadLevel10() {
        this.currentLevel = 9;
        this.clearEntities();

        // Maze-like level with platforms and spikes
        this.game.addEntity(new Platform(0, 734, 1024, 32));
        this.game.addEntity(new Platform(0, 600, 300, 32));
        this.game.addEntity(new Platform(724, 600, 300, 32));
        this.game.addEntity(new Platform(350, 500, 324, 32));
        this.game.addEntity(new Platform(0, 400, 200, 32));
        this.game.addEntity(new Platform(824, 400, 200, 32));
        this.game.addEntity(new Platform(350, 300, 324, 32));
        this.game.addEntity(new Spikes(200, 389, 624, 11));
        this.game.addEntity(new SpikesUD(500, 232, 100, 8));
        this.game.addEntity(new MovingPlatform(this.game, 512, 200, 100, 32, 0, 80));

        // Borders
        this.game.addEntity(new Border(0, 0, 1, 768));
        this.game.addEntity(new Border(1023, 0, 1, 768));
        this.game.addEntity(new Border(0, 767, 1024, 1));
        this.game.addEntity(new Border(0, 0, 1024, 1));

        const cav = new Caveman(this.game, this);
        cav.x = 50;
        cav.y = 650;
        cav.boundingBox.update(cav.x, cav.y);
        this.game.addEntity(cav);
        this.game.addEntity(new Torch(this.game, 58, 60));
        this.game.addEntity(new Torch(this.game, 470, 60));
        this.game.addEntity(new Torch(this.game, 870, 60));
    }

    nextLevel() {
        if (this.isGameComplete) return;
        if (!this._queued) {
            this._queued = true;
            console.log("Level transition queued");
        }
    }

    reloadLevel() {
        if (this.isGameComplete) return;
        if (!this._reloadQueued) {
            this._reloadQueued = true;
            console.log("Level reload queued");
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
        if (this.isGameComplete) {
            this._queued = false;
            return;
        }

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
        } else if (this.currentLevel === 6) {
            this.loadLevel7();
        } else if (this.currentLevel === 7) {
            this.loadLevel8();
        } else if (this.currentLevel === 8) {
            this.loadLevel9();
        } else if (this.currentLevel === 9) {
            this.loadLevel10();
        } else {
            this.completeGame();
        }
        this._queued = false;
    }

    reloadLevelImmediate() {
        console.log("Reloading level", this.currentLevel);
        if (this.currentLevel === 0) {
            this.loadLevel1();
        } else if (this.currentLevel === 1) {
            this.loadLevel2();
        } else if (this.currentLevel === 2) {
            this.loadLevel3();
        } else if (this.currentLevel === 3) {
            this.loadLevel4();
        } else if (this.currentLevel === 4) {
            this.loadLevel5();
        } else if (this.currentLevel === 5) {
            this.loadLevel6();
        } else if (this.currentLevel === 6) {
            this.loadLevel7();
        } else if (this.currentLevel === 7) {
            this.loadLevel8();
        } else if (this.currentLevel === 8) {
            this.loadLevel9();
        } else if (this.currentLevel === 9) {
            this.loadLevel10();
        } else {
            this.currentLevel = 0;
            this.loadLevel1();
        }
        this._reloadQueued = false;
    }
}