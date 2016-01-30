var LevelComposite = function(levels) {
    this.levels = [];
    this.addLevel(LEVEL_1);
    this.addLevel(LEVEL_2);
    this.addLevel(LEVEL_3);
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
        total += this.levels[iLevel].height;
    }
    return total;
}


var Level = function(levelJson, number) {
    this.height = 250;

    this.number = number;
    this.baseHeight = this.number * this.height * -1;
    this.pathLeft = new Path();
    this.pathRight = new Path();

    this.pathLeft.extendByList(
            levelJson.left, 
            this.baseHeight
            );

    this.pathRight.extendByList(
            levelJson.right, 
            this.baseHeight
            );
}

Level.prototype.draw = function(context) {
    c.beginPath();
    c.setLineDash([5, 15]);
    var height = this.baseHeight - this.height;
    c.moveTo(0, height);
    c.lineTo(game.WIDTH, height);
    c.stroke();
    c.setLineDash([]);

    this.pathLeft.draw(context);
    this.pathRight.draw(context);
};


var LEVEL_1 = {
    left : [
        {x: 150, y: 0},
        {x: 150, y: -050},
        {x: 125, y: -100},
        {x: 125, y: -150},
        {x: 150, y: -200},
        {x: 150, y: -250}
    ],
    right : [
        {x: 450, y: 0},
        {x: 450, y: -050},
        {x: 475, y: -100},
        {x: 475, y: -150},
        {x: 450, y: -200},
        {x: 450, y: -250}
    ]
};

var LEVEL_2 = {
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
