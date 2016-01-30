function IngameState() {

	// just for demonstration purposes:

	this.demoText;
	
	this.demoParticleSystem1;
	this.demoParticleSystem2;
	
	this.demoMatrixFromImage;
	
	this.demoShaking;
	
	this.demoImageRotation = 0;
	this.demoImageX = 450;
	this.demoImageY = 300;

    this.rotatingLine = new RotatingLine();
	

	this.init = function() {
		

	};


	this.show = function() {

		// do stuff before we start in-game state, examples:
		
		this.demoMatrixFromImage = ImageProcessing.readMatrix("demoData", 10, 10, "empty" , {
			"#000000" : "full",
		});
		
		this.demoText = new Text();
		this.demoText.pos(450, 20);
		this.demoText.setAlignment(Text.CENTER);
		this.demoText.text("Hello World!");

		mouse.registerUpArea("demoFire", 0, 0, game.WIDTH, game.HEIGHT, function() {
			if(!game.paused) {
				game.state.demoParticleSystem2.setEmitter(mouse.x, mouse.y);
				game.state.demoParticleSystem2.burst();
				game.state.demoShaking.shake(6, 18, 2);
				sound.play("cannon");
			}
		});
		
		mouse.registerDraggableArea("demoDragAndDrop", 420, 270, 60, 60, function() {
			console.log("started dragging.");
		}, function() {
			game.state.demoImageX += mouse.dragDeltaX;
			game.state.demoImageY += mouse.dragDeltaY;
		}, function() {
			console.log("end dragging.");
		});
	};


	this.hide = function() {

		// do stuff before we end in-game state, examples:

		mouse.deleteUpArea("demoFire");
		
		mouse.deleteDraggableArea("demoDragAndDrop");
	};


	this.update = function() {

		// update stuff here:
        this.rotatingLine.update(timer.delta);

		if(!game.paused) {
			this.demoImageRotation += 2.0 * timer.delta;
		}
	};


	this.draw = function() {
        this.clear();

        this.rotatingLine.draw(c);
		
	};

    this.clear = function(){
        c.fillStyle = "#fff";
        c.fillRect(0, 0, game.WIDTH, game.HEIGHT);
    }

}
