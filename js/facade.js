function Facade() {


    this.bricks = [];

    this.bricksWaiting = [];
    this.brickCountdown = 0.0;

    this.pathLeft;
    this.pathRight;


    this.init = function(pathLeft, pathRight) {
        this.pathLeft = pathLeft;
        this.pathRight = pathRight;
    };


    this.addBricks = function(side, startY, endY) {

        var startY = Math.floor(-startY / 24) - 1;
        if(startY < 0) {
            startY = 0;
        }
        var endY = Math.floor(-endY / 24);
        if(endY < 0) {
            endY = 0;
        }

        for(var y = startY; y <= endY; y++) {
            if(this.bricks.length - 1 < y) {
                this.bricks[y] = [];
                for(var x = 0; x < 14; x++) {
                    this.bricks[y][x] = {
                        show : false,
                        waiting : false,
                        path: []
                    }
                }
            }
        }

        for(var y = startY; y <= endY; y++) {
            var xOffset = 0;
            if(y % 2 == 0) {
                xOffset = -24;
            }
            for(var tempX = 0; tempX < 14; tempX++) {
                var x = tempX;
                if(side == 1) {
                    x = 13 - x;
                }
                var brick = this.bricks[y][x];
                if(!brick.waiting) {
                    var path = [];
                    var limit = [];

                    path[0] = { x : (48 * x) + xOffset, y : (-24 * y) };
                    path[1] = { x : (48 * x) + xOffset, y : (-24 * y) - 12};
                    path[2] = { x : (48 * x) + xOffset, y : (-24 * y) - 24 };
                    path[3] = { x : (48 * (x + 1)) + xOffset, y : (-24 * y) - 24 };
                    path[4] = { x : (48 * (x + 1)) + xOffset, y : (-24 * y) - 12 };
                    path[5] = { x : (48 * (x + 1)) + xOffset, y : (-24 * y) };

                    limit[0] =

                    this.bricks[y][x].path = path;
                    brick.waiting = true;
                    this.bricksWaiting.push({ x : x, y : y });
                }
            }
        }
    };


    this.update = function() {
        if(this.bricksWaiting.length > 0) {
            this.brickCountdown += timer.delta;
        } else {
            this.brickCountdown = 0.0;
        }
        while(this.brickCountdown > 0.1) {
            this.brickCountdown -= 0.1;
            if(this.bricksWaiting.length > 0) {
                var brick = this.bricksWaiting[0];
                this.bricksWaiting.shift();
                this.bricks[brick.y][brick.x].show = true;
            }
        }
    };


    this.draw = function(cameraY) {
        var yStart = Math.floor((cameraY - 102) / 24);
        var yEnd = Math.ceil((cameraY + 482) / 24);
        var offsets = [
            { x : -1, y : 1 },
            { x : -1, y : 0 },
            { x : -1, y : -1 },
            { x : 1, y : -1 },
            { x : 1, y : 0 },
            { x : 1, y : 1 },
        ];
        for(var y = yStart; y <= yEnd; y++) {
            if(y >= 0 && y < this.bricks.length) {
                var brickRow = this.bricks[y];
                for(var x = 0; x < 14; x++) {
                    var brick = brickRow[x];
                    if(brick.show) {
                        c.fillStyle = "#333";
                        c.beginPath();
                        c.moveTo(brick.path[0].x + offsets[0].x, brick.path[0].y + offsets[0].y);
                        for(var i = 1; i < 6; i++) {
                            c.lineTo(brick.path[i].x + offsets[i].x, brick.path[i].y + offsets[i].y);
                        }
                        c.closePath();
                        c.fill();
                        c.fillStyle = "#999";
                        c.beginPath();
                        c.moveTo(brick.path[0].x - offsets[0].x, brick.path[0].y - offsets[0].y);
                        for(var i = 1; i < 6; i++) {
                            c.lineTo(brick.path[i].x - offsets[i].x, brick.path[i].y - offsets[i].y);
                        }
                        c.closePath();
                        c.fill();
                    }
                }
            }
        }
    };

};