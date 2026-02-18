class GameEngine {
    constructor(options) {
        this.ctx = null;

        this.entities = [];

        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true; 
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.tabIndex = 0;
        this.ctx.canvas.focus();

        this.ctx.canvas.addEventListener("keydown", (event) => {
            const k = event.key.toLowerCase();
            this.keys[k] = true;

            if (["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," "].includes(k)) {
                event.preventDefault();
            }
        });

        this.ctx.canvas.addEventListener("keyup", (event) => {
            const k = event.key.toLowerCase();
            this.keys[k] = false;
            event.preventDefault();
        });

                this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault();
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault();
            this.rightclick = getXandY(e);
        });
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }

        // Debug: draw bounding boxes for entities that have them
        // if (this.options.debugging || this.options.showBoundingBoxes) {
        //     this.ctx.save();
        //     this.ctx.strokeStyle = "white";
        //     this.ctx.lineWidth = 1;
        //     for (let i = 0; i < this.entities.length; i++) {
        //         const e = this.entities[i];
        //         if (e && e.boundingBox) {
        //             this.ctx.strokeRect(
        //                 e.boundingBox.left,
        //                 e.boundingBox.top,
        //                 e.boundingBox.width,
        //                 e.boundingBox.height
        //             );
        //         }
        //     }
        //     this.ctx.restore();
        // }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        // Check if caveman died and reset moving platforms
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] instanceof Caveman && !this.entities[i].life) {
                if (this.sceneManager) {
                    this.sceneManager.resetMovingPlatforms();
                }
                // Resurrect the caveman
                this.entities[i].life = true;
                break;
            }
        }

        // Process any queued scene transitions (do this here to avoid mutating
        // the entities list while it's being iterated above)
        if (this.sceneManager && this.sceneManager._queued) {
            this.sceneManager.nextLevelImmediate();
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    isKeyPressed(key) {
        key = key.toLowerCase();
        if (this.keys[key]) {
            return true;
        }
        return false;
    }

};