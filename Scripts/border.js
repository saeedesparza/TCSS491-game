class Border {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {

    }

    draw(ctx) {
        
    }
}
