var LevelComposite = function(levels) {
    this.levels = [
        new Level(LEVEL_1)
        , new Level(LEVEL_2)
    ];
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


var Level = function(levelJson) {
    this.height = 250;

    this.number = levelJson.number
    this.baseHeight = this.number * this.height * -1;
    this.pathLeft = new Path();
    this.pathRight = new Path();

    this.pathLeft.addSegment(levelJson.startSegmentLeft[0], levelJson.startSegmentLeft[1], this.baseHeight);
    this.pathLeft.extendByList(levelJson.left, this.baseHeight);

    this.pathRight.addSegment(levelJson.startSegmentRight[0], levelJson.startSegmentRight[1], this.baseHeight);
    this.pathRight.extendByList(levelJson.right, this.baseHeight);
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
    number: 0,
    startSegmentLeft: [
        {x: 150, y: 0},
        {x: 150, y: -050}
    ],
    left : [
        {x: 100, y: -100},
        {x: 100, y: -150},
        {x: 150, y: -200},
        {x: 150, y: -250}
    ],
    startSegmentRight: [
        {x: 450, y: 0},
        {x: 450, y: -050}
    ],
    right : [
        {x: 500, y: -100},
        {x: 500, y: -150},
        {x: 450, y: -200},
        {x: 450, y: -250}
    ]
};

var LEVEL_2 = {
    number: 1,
    startSegmentLeft: [
        {x: 150, y: 0},
        {x: 150, y: -050}
    ],
    left : [
        {x: 100, y: -100},
        {x: 100, y: -150},
        {x: 150, y: -200},
        {x: 150, y: -250}
    ],
    startSegmentRight: [
        {x: 450, y: 0},
        {x: 450, y: -050}
    ],
    right : [
        {x: 500, y: -100},
        {x: 500, y: -150},
        {x: 450, y: -200},
        {x: 450, y: -250}
    ]
};
