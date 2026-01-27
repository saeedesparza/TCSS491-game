class BoundingBox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.left = x;
        this.right = x + width;
        this.top = y;
        this.bottom = y + height;
    }

    update(x, y) {
        this.x = x;
        this.y = y;
        this.left = x;
        this.right = x + this.width;
        this.top = y;
        this.bottom = y + this.height;
    }

    collide(other) {
        return (
            this.right > other.left &&
            this.left < other.right &&
            this.bottom > other.top &&
            this.top < other.bottom
        );
    }
}