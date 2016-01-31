var LevelComposite = function(ingameState) {
    this.levels = [];
    this.addLevel(LEVEL_1);
    this.addLevel(LEVEL_2);
    this.addLevel(LEVEL_3);
    this.levels[0].start(ingameState);
}

LevelComposite.prototype.addLevel = function(level) {
    var level = new Level(level, this.levels.length);
    this.levels.push(level);
}

LevelComposite.prototype.draw = function(context) {
    for (var iLevel in this.levels) {
        var level = this.levels[iLevel];
        level.draw(context)
    }
}
LevelComposite.prototype.heightOfLevel = function(levelNum) {
    var total = 0;
    for (iLevel in this.levels) {
        if(iLevel > levelNum){
            console.log(total);
            return total;
        }
        total -= this.levels[iLevel].height;
    }
    return total;
}

LevelComposite.prototype.completeLevel = function(ingameState) {
    var curLevel = this.levels[ingameState.currentLevel];
    if(ingameState.currentLevel < this.levels.length) {
        this.levels[ingameState.currentLevel + 1].start(ingameState);
    }
    return curLevel.complete(ingameState);
}

var Level = function(levelJson, number) {
    this.height = 250;

    this.number = number;
    this.baseHeight = this.number * this.height * -1;
    this.pathLeft = new Path();
    this.pathRight = new Path();
    this.title = levelJson.title;
    this.cameraV = levelJson.cameraV;

    this.pathLeft.extendByList(
            levelJson.left, 
            this.baseHeight
            );

    this.pathRight.extendByList(
            levelJson.right, 
            this.baseHeight
            );
}

Level.prototype.draw = function() {

    c.lineWidth = 2;
    c.beginPath();
    c.setLineDash([2, 18]);
    var height = this.baseHeight - this.height;
    c.moveTo(9, height);
    c.lineTo(game.WIDTH, height);
    c.stroke();
    c.setLineDash([]);

    c.lineWidth = 3;
    c.setLineDash([10, 10]);
    this.pathLeft.draw(true);
    this.pathRight.draw(true);
    c.setLineDash([]);
};

Level.prototype.complete = function(ingameState){
    var score = comparePaths(this.pathLeft, ingameState.pathLeft);
    return score;
};


Level.prototype.start = function(ingameState) {
    ingameState.showLevelTitle(this.title);
    ingameState.cameraV = this.cameraV;
};


var LEVEL_1 = {
    title : "Level 1",
    cameraV : 6,
    left : [
        {x: 150, y: 0},
        {x: 150, y: -50},
        {x: 125, y: -100},
        {x: 125, y: -150},
        {x: 150, y: -200},
        {x: 150, y: -250}
    ],
    right : [
        {x: 450, y: 0},
        {x: 450, y: -50},
        {x: 475, y: -100},
        {x: 475, y: -150},
        {x: 450, y: -200},
        {x: 450, y: -250}
    ]
};

var LEVEL_2 = {
    title : "Level 2",
    cameraV : 12,
    left : [
        {x: 150, y: 0},
        {x: 150, y: -50},
        {x: 200, y: -100},
        {x: 200, y: -150},
        {x: 150, y: -200},
        {x: 150, y: -250}
    ],
    right : [
        {x: 450, y: 10},
        {x: 450, y: -50},
        {x: 400, y: -100},
        {x: 400, y: -150},
        {x: 450, y: -200},
        {x: 450, y: -250}
    ]
};

var LEVEL_3 = {
    title : "Level 3",
    cameraV : 18,
    left: [
        {x: 150, y: 0},
        {x: 100, y: -50},
        {x: 150, y: -100},
        {x: 150, y: -150},
        {x: 100, y: -200},
        {x: 150, y: -250}
    ],
    right : [
        {x: 450, y: 0},
        {x: 500, y: -50},
        {x: 450, y: -100},
        {x: 450, y: -150},
        {x: 500, y: -200},
        {x: 450, y: -250}
    ]
};
