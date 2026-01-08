var ASSET_MANAGER = new AssetManager();

// ASSET_MANAGER.queueDownload("png_name_here");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	ASSET_MANAGER.autoRepeat("./music/overworld.mp3");
	ASSET_MANAGER.autoRepeat("./music/underworld.mp3");
	ASSET_MANAGER.autoRepeat("./music/overworld-hurry.mp3");
	ASSET_MANAGER.autoRepeat("./music/underworld-hurry.mp3");

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorldName');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
		
	new SceneManager(gameEngine);

	gameEngine.start();
});