BASE_LINE = 500;
function IngameState() {

    this.pathLeft = new Path();
    this.pathRight = new Path();
    this.activePath;
    this.rotatingLine = new RotatingLine();

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

        for(var i in this.levels.levels){
            var level = this.levels.levels[i];
            context.beginPath();
            totalHeight += level.height;
            context.moveTo(0,BASE_LINE-totalHeight);
            context.lineTo(game.WIDTH, BASE_LINE-totalHeight);
            context.stroke();

        }
        context.setLineDash([]);
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
            if(this.pathLeft.level <= this.currentLevel) {
                this.attachToLeft();
            }
        } else {
            if(this.pathRight.level <= this.currentLevel) {
                this.attachToRight();
            }
        }
    };


    this.attachToLeft = function() {
        this.activePath = this.pathLeft;
        this.rotatingLine.reset(-1, this.activePath.segments[this.activePath.segments.length - 1].end);
    };


    this.attachToRight = function() {
        this.activePath = this.pathRight;
        this.rotatingLine.reset(1, this.activePath.segments[this.activePath.segments.length - 1].end);
    };

}
