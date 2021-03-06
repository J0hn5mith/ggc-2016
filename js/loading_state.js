function LoadingState() {

	this.SOUND_MANAGER_PERCENTAGE = 5;
	this.IMAGE_PERCENTAGE = 35;
	this.SOUND_PERCENTAGE = 15;
	this.FONT_PERCENTAGE = 5;
	this.FAKE_PERCENTAGE = 40;

	this.FAKE_LOADING_TIME = 0.1; // adjust fixed loading time

	this.TIME_BEFORE_SOUND_LOADING_FAIL = 5.0;

	this.percentage = 0;
	this.fakeLoadingCountdown = 0.0;
	this.soundLoadingCountdown = 0.0;


	this.init = function() {

		this.fakeLoadingCountdown = this.FAKE_LOADING_TIME;
		this.soundLoadingCountdown = this.TIME_BEFORE_SOUND_LOADING_FAIL;

		preloadingManager.preload();
	};


	this.hide = function() {
		jQuery("#loading").hide();
	};


	this.update = function() {

		var soundManagerPreloader = preloadingManager.soundManagerPreloader;
		var imagePreloader = preloadingManager.imagePreloader;
		var soundPreloader = preloadingManager.soundPreloader;
		var fontPreloader = preloadingManager.fontPreloader;

		var soundManagerPercentage = soundManagerPreloader.getFractionLoaded() * this.SOUND_MANAGER_PERCENTAGE;
		var imagePercentage = imagePreloader.getFractionLoaded() * this.IMAGE_PERCENTAGE;
		var soundPercentage = soundPreloader.getFractionLoaded() * this.SOUND_PERCENTAGE;
		var fontPercentage = fontPreloader.getFractionLoaded() * this.FONT_PERCENTAGE;
		var fakeLoadingPercentage = (1.0 - (this.fakeLoadingCountdown / this.FAKE_LOADING_TIME)) * this.FAKE_PERCENTAGE;
		
		this.percentage = soundManagerPercentage + imagePercentage + soundPercentage + fontPercentage + fakeLoadingPercentage;

		if(imagePreloader.isLoaded() && fontPreloader.isLoaded() &&
				((soundManagerPreloader.isLoaded() && soundPreloader.isLoaded()) || this.soundLoadingCountdown < 0)) {
			this.fakeLoadingCountdown -= timer.delta;
			if(this.fakeLoadingCountdown < 0) {
				preloadingManager.customPreload();
				if(game.EDITOR) {
					game.setState("editor");
				} else {
					game.setState("ingame");
				}
			}
		}

		if(imagePreloader.isLoaded() && fontPreloader.isLoaded() && !soundPreloader.isLoaded()) {
			this.soundLoadingCountdown -= timer.delta;
		}
	};


	this.draw = function() {
		jQuery("#loading_text").text(Math.ceil(this.percentage) + "%");
		jQuery("#loading_bar").width(jQuery("#loading_bar_box").width * (this.percentage / 100.0));
	};

}
