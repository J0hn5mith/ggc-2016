function IngameState() {

    this.pathLeft = new Path();
    this.pathLeftOriginal = new Path();
    this.pathRight = new Path();
    this.activePath;
    this.rotatingLine = new RotatingLine();

    this.background = new Background();
    this.levels = new LevelComposite();
    this.currentLevel = 0;


    this.init = function() {

    };


    this.show = function() {
        var caller = this;
        keyboard.registerKeyDownHandler(Keyboard.SPACE_BAR, function() {
            caller.trigger();
        });

        this.pathLeft.addSegment({
            x: 150,
            y: 0
        }, {
            x: 150,
            y: -50
        });
        this.pathRight.addSegment({
            x: 450,
            y: 0
        }, {
            x: 450,
            y: -50
        });

        this.activePath = this.pathLeft;
        this.rotatingLine.side = -1;
        this.rotatingLine.reset(this.activePath.segments[this.activePath.segments.length - 1].end);
    };


    this.hide = function() {
        keyboard.deleteKeyDownHandler(Keyboard.SPACE_BAR);
    };


    this.update = function() {
        if (!game.paused) {
            if(keyboard.isPressed(Keyboard.ARROW_UP) || keyboard.isPressed(Keyboard.ARROW_RIGHT)) {
                this.rotatingLine.increaseLength();
            }
            if(keyboard.isPressed(Keyboard.ARROW_DOWN) || keyboard.isPressed(Keyboard.ARROW_LEFT)) {
                this.rotatingLine.decreaseLength();
            }
            this.rotatingLine.update(timer.delta);
        }
    };


    this.draw = function() {
        this.clear();

        c.translate(0, 500);

        this.background.draw();

        this.rotatingLine.draw(c);
        this.pathLeft.draw(c);
        this.pathRight.draw(c);
        this.levels.draw(c);
        c.translate(0, -500);
    };

    //this.drawLevels = function() {

        //c.setLineDash([5, 15]);

        //c.beginPath();
        //c.moveTo(0, 0);
        //c.lineTo(game.WIDTH, 0);
        //c.stroke();

        //var totalHeight = 0;
        //c.setLineDash([]);
    //};

    this.clear = function() {
        c.fillStyle = "#fff";
        c.fillRect(0, 0, game.WIDTH, game.HEIGHT);
    };


    this.trigger = function() {
        this.activePath.addSegment(
            this.rotatingLine.center,
            this.rotatingLine.tip
        );
        if(this.rotatingLine.tip.y < -this.levels.heightOfLevel(this.currentLevel)){
            this.activePath.level = this.currentLevel + 1;
        }
        if (this.pathLeft.level > this.currentLevel && this.pathRight.level > this.currentLevel){
            this.currentLevel += 1;
        }
        this.toggleAttachment();
        //comparePaths(this.pathLeft, this.pathLeftOriginal);
    };


    this.toggleAttachment = function() {
        if (this.activePath == this.pathRight) {
            if(this.pathLeft.level <= this.currentLevel) {
                this.activePath = this.pathLeft;
                this.rotatingLine.side = -1;
            }
        } else {
            if(this.pathRight.level <= this.currentLevel) {
                this.activePath = this.pathRight;
                this.rotatingLine.side = 1;
            }
        }
        this.rotatingLine.reset(this.activePath.segments[this.activePath.segments.length - 1].end);
    };

}
