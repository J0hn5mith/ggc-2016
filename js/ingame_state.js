function IngameState() {

    this.pathLeft;
    this.pathRight;
    this.activePath;
    this.rotatingLine;

    this.background = new Background();

    this.levels;
    this.currentLevel = 0;

    this.facade;

    this.cameraY = 0;
    this.cameraV = 0;

    this.levelTitle = "";
    this.levelTitleTimer = 0.0;

    this.tutorialTimer = 0.0;


    this.init = function() {

    };


    this.show = function() {

        this.pathLeft = new Path();
        this.pathRight = new Path();
        this.rotatingLine = new RotatingLine();

        this.levels = new LevelComposite(this);
        this.currentLevel = 0;

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

        this.facade = new Facade();
        this.facade.init(this.pathLeft, this.pathRight);
        this.facade.addBricks(1, 0, -50);

        this.activePath = this.pathLeft;
        this.rotatingLine.side = -1;
        this.rotatingLine.reset(this.activePath.segments[this.activePath.segments.length - 1].end);

        this.tutorialTimer = 12.0;
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
            this.cameraY += this.cameraV * timer.delta;
            this.facade.update();

            if(this.levelTitleTimer > 0.0) {
                this.levelTitleTimer -= timer.delta;
                if(this.levelTitleTimer < 0.0) {
                    this.levelTitleTimer = 0.0;
                }
            }

            if(this.tutorialTimer > 0.0) {
                this.tutorialTimer -= timer.delta;
                if(this.tutorialTimer < 0.0) {
                    this.tutorialTimer = 0.0;
                }
            }
        }
    };


    this.draw = function() {
        this.clear();

        c.translate(0, 500);
        c.translate(0, this.cameraY);

        this.background.drawSky(this.cameraY);
        this.drawBaseLine();
        this.levels.draw(c);
        this.background.drawHill();
        this.facade.draw(this.cameraY);
        this.drawWalls();

        c.translate(0, -this.cameraY);
        c.translate(0, -500);

        if(this.levelTitleTimer > 0.0) {
            c.globalAlpha = limit(this.levelTitleTimer, 0.0, 1.0);
            c.font = "30px Arial";
            c.fillStyle = "#fff";
            c.textAlign = "center";
            c.fillText(this.levelTitle, 300, 50);
            c.globalAlpha = 1.0;
        }

        if(this.tutorialTimer > 0.0) {
            c.globalAlpha = limit(this.tutorialTimer, 0.0, 1.0);
            c.font = "18px Arial";
            c.fillStyle = "#fff";
            c.textAlign = "center";
            c.fillText("Place wall with SPACE. Change size with UP/DOWN.", 300, 583);
            c.globalAlpha = 1.0;
        }
    };


    this.drawBaseLine = function() {
        c.lineWidth = 2;
        c.beginPath();
        c.setLineDash([2, 18]);
        c.moveTo(9, 0);
        c.lineTo(game.WIDTH, 0);
        c.stroke();
        c.setLineDash([]);
    };


    this.drawWalls = function() {

        c.lineWidth = 12;
        c.lineJoin = "bevel";
        c.strokeStyle = "#f2f0e9";

        c.beginPath();
        this.pathLeft.draw(false);
        if(this.rotatingLine.side == -1) {
            this.rotatingLine.draw(c);
        }
        c.stroke();

        c.beginPath();
        this.pathRight.draw(false);
        if(this.rotatingLine.side == 1) {
            this.rotatingLine.draw(c);
        }
        c.stroke();

        c.lineJoin = "miter";
    };

    this.clear = function() {
        c.fillStyle = "#fff";
        c.fillRect(0, 0, game.WIDTH, game.HEIGHT);
    };


    this.showLevelTitle = function(title) {
        this.levelTitle = title;
        this.levelTitleTimer = 4.0;
    };


    this.trigger = function() {
        this.activePath.addSegment(
            this.rotatingLine.center,
            this.rotatingLine.tip
        );
        if(this.rotatingLine.tip.y < this.levels.heightOfLevel(this.currentLevel)){
            this.activePath.level = this.currentLevel + 1;
        }
        if (this.pathLeft.level > this.currentLevel && this.pathRight.level > this.currentLevel){
            var score = this.levels.completeLevel(this);
            this.currentLevel += 1;
        }
        this.facade.addBricks(this.rotatingLine.side, this.rotatingLine.center.y, this.rotatingLine.tip.y);
        this.toggleAttachment();
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
