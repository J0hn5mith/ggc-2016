BASE_LINE = 500;
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

    this.pathLeft = new Path();
    this.pathRight = new Path();
    this.activePath;
    this.rotatingLine = new RotatingLine();
    this.attachmentState = false; // false = left, true = right

    this.levels = new LevelComposite();
    this.currentLevel = 0;


    this.init = function() {
        var caller = this;
        keyboard.registerKeyDownHandler(Keyboard.SPACE_BAR, function() {
            caller.trigger();
        });
        keyboard.registerKeyUpHandler(Keyboard.ARROW_RIGHT, function() {
            caller.rotatingLine.increaseLength();
        });
        keyboard.registerKeyUpHandler(Keyboard.ARROW_LEFT, function() {
            caller.rotatingLine.decreaseLength();
        });

        this.pathLeft.addSegment({
            x: 200,
            y: 500
        }, {
            x: 200,
            y: 400
        });
        this.pathRight.addSegment({
            x: 400,
            y: 500
        }, {
            x: 400,
            y: 400
        });
        this.rotatingLine.middleX = 300;
        this.attachToLeft();
    };


    this.show = function() {

        // do stuff before we start in-game state, examples:

        this.demoMatrixFromImage = ImageProcessing.readMatrix("demoData",
            10, 10, "empty", {
                "#000000": "full",
            });

        mouse.registerUpArea("demoFire", 0, 0, game.WIDTH, game.HEIGHT,
            function() {
                if (!game.paused) {
                    game.state.demoParticleSystem2.setEmitter(mouse.x,
                        mouse.y);
                    game.state.demoParticleSystem2.burst();
                    game.state.demoShaking.shake(6, 18, 2);
                    sound.play("cannon");
                }
            });

        mouse.registerDraggableArea("demoDragAndDrop", 420, 270, 60, 60,
            function() {
                console.log("started dragging.");
            },
            function() {
                game.state.demoImageX += mouse.dragDeltaX;
                game.state.demoImageY += mouse.dragDeltaY;
            },
            function() {
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

        if (!game.paused) {
            this.demoImageRotation += 2.0 * timer.delta;
        }
    };


    this.draw = function() {
        this.clear();

        this.rotatingLine.draw(c);
        this.pathLeft.draw(c);
        this.pathRight.draw(c);
        c.beginPath();
        c.moveTo(300, 0);
        c.lineTo(300, 500);
        c.stroke();

        this.drawLevels(c);

    };

    this.drawLevels = function(context) {
        if(this.levels.levels.length == 0){
            return;
        }
        var totalHeight = 0;

            context.setLineDash([5, 15]);
            context.beginPath();
            context.moveTo(0,BASE_LINE);
            context.lineTo(game.WIDTH, BASE_LINE);
            context.stroke();

        for(var level of this.levels.levels){
            context.beginPath();
            totalHeight += level.height;
            context.moveTo(0,BASE_LINE-totalHeight);
            context.lineTo(game.WIDTH, BASE_LINE-totalHeight);
            context.stroke();

        }
            context.setLineDash([0]);
    };

    this.clear = function() {
        c.fillStyle = "#fff";
        c.fillRect(0, 0, game.WIDTH, game.HEIGHT);
    };

    this.trigger = function() {
        var tip = this.rotatingLine.tip;
        this.activePath.addSegment(
            this.rotatingLine.center,
            this.rotatingLine.tip
        );
        if(this.rotatingLine.tip.y < BASE_LINE - this.levels.heightOfLevel(this.currentLevel)){
            this.activePath.level = this.currentLevel + 1;
        }
        if (this.pathLeft.level > this.currentLevel && this.pathRight.level > this.currentLevel){
            this.currentLevel += 1;
        }
        this.toggleAttachment();
    };

    this.toggleAttachment = function() {
        if (this.activePath == this.pathRight) {
            this.attachToLeft();
        } else {
            this.attachToRight();
        }
        this.activePath.angle = Math.PI

        if(this.activePath.level > this.currentLevel){
            this.toggleAttachment();
        }

    }

    this.attachToLeft = function() {
        this.activePath = this.pathLeft;
        this.rotatingLine.reset( this.activePath.segments[this.activePath .segments.length - 1].end);
    }

    this.attachToRight = function() {
        this.activePath = this.pathRight;
        this.rotatingLine.reset( this.activePath.segments[this.activePath .segments.length - 1].end);
    }
}
