class FakePlatform extends Platform {
    constructor(x, y, width, height, tileIndex = 0) {
        super(x, y, width, height, tileIndex);
    }

    update() {
        // FakePlatform has no update logic
    }

    // Inherits draw() from Platform, so it will be visible
}
