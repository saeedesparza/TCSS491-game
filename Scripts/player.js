class Player {
    constructor(game, x, y, ) {
        //PLAYER INITIALIZER
        Object.assign(this, { game, x, y, spritesheet });
        this.game.player = this;
        this.scale = 3;
        this.bitSize = 32;

        //PLAYER START
        this.speed = 180;
        this.state = 0;
        this.facing = 0

        this.animation = new Animator(this.spritesheet, );

        //PLAYER HEALTH
        // this.dead = false;
        // this.health = 100;
    }

    attack() {
        //placeholder.
    }
}