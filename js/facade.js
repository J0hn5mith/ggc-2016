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

        var leftEnd = this.pathLeft.findLastPosition();
        var rightEnd = this.pathRight.findLastPosition();

        var topLimitM = 0;
        if(rightEnd.x - leftEnd.x > 0) {
            topLimitM = (rightEnd.y - leftEnd.y) / (rightEnd.x - leftEnd.x);
        }

        var topLimitY = leftEnd.y - (leftEnd.x * topLimitM);


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

                    limit[0] = this.pathLeft.getHeightIndex((-24 * y)).x;
                    limit[1] = this.pathLeft.getHeightIndex((-24 * y) - 12).x;
                    limit[2] = this.pathLeft.getHeightIndex((-24 * y) - 24).x;
                    limit[3] = this.pathRight.getHeightIndex((-24 * y) - 24).x;
                    limit[4] = this.pathRight.getHeightIndex((-24 * y) - 12).x;
                    limit[5] = this.pathRight.getHeightIndex((-24 * y)).x;

                    if((path[0].x <= limit[5] || path[1].x <= limit[4] || path[2].x <= limit[3]) &&
                        (path[3].x >= limit[2] || path[4].x >= limit[1] || path[5].x >= limit[0])) {

                        if(path[2].y >= topLimitY + (path[2].x * topLimitM) &&
                            path[3].y >= topLimitY + (path[3].x * topLimitM)) {

                            for(var i = 0; i <= 2; i++) {
                                if(path[i].x < limit[i]) {
                                    path[i].x = limit[i];
                                    if(path[i].x > path[5 - i].x) {
                                        path[i].x = path[5 - i].x;
                                        path[i].y = path[1].y;
                                        path[5 - i].y = path[1].y;
                                    }
                                }
                            }
                            for(var i = 3; i <= 5; i++) {
                                if(path[i].x > limit[i]) {
                                    path[i].x = limit[i];
                                    if(path[i].x < path[5 - i].x) {
                                        path[i].x = path[5 - i].x;
                                        path[i].y = path[4].y;
                                        path[5 - i].y = path[4].y;
                                    }
                                }
                            }

                            this.bricks[y][x].path = path;
                            brick.waiting = true;
                            this.bricksWaiting.push({ x : x, y : y });
                        }
                    }
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
                        c.fillStyle = "#bfbeb8";
                        c.beginPath();
                        c.moveTo(brick.path[0].x + offsets[0].x, brick.path[0].y + offsets[0].y);
                        for(var i = 1; i < 6; i++) {
                            c.lineTo(brick.path[i].x + offsets[i].x, brick.path[i].y + offsets[i].y);
                        }
                        c.closePath();
                        c.fill();
                        c.fillStyle = "#d9d7d0";
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