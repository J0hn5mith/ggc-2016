function PreloadingManager() {

	this.soundManagerPreloader;
	this.imagePreloader;
	this.soundPreloader;
	this.fontPreloader;


	this.preload = function() {

		this.soundManagerPreloader = new Preloader();
		this.imagePreloader = new Preloader();
		this.soundPreloader = new Preloader();
		this.fontPreloader = new Preloader();

		this.soundManagerPreloader.setEndCallback(function() {
			preloadingManager.soundPreloader.loadSounds(resources.sounds);
		});
		this.soundManagerPreloader.loadSoundManager();

		this.imagePreloader.setEndCallback(function() {
			preloadingManager.fontPreloader.loadFonts(resources.fonts);
		});
		this.imagePreloader.loadImages(resources.images);
	};
	
	
	this.customPreload = function() {
		
		// Here you can preload custom things, like generating textures
		
		ImageProcessing.replaceColors("test2", "test2recolored", {
			"#ff0000" : "#336600",
		});
		
		ImageProcessing.pixelate("test2recolored", "test2recoloredResized", 3);
		
		var demoCanvas = createCanvas(150, 150);
		var demoC = getContext(demoCanvas);
		demoC.fillStyle = "#000";
		demoC.fillRect(0, 0, 150, 150);
		demoC.drawImage(img.get("test2recoloredResized"), 0, 0);
		img.add("demoGeneratedTexture", demoCanvas);
		
	};

}