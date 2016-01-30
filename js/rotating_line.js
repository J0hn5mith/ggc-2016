var CHANGE_STEP = 10;
var MAX_LINE_LENGTH = 200;
var MIN_ANGLE = Math.PI * 0.5;
var MAX_ANGLE = Math.PI * 1.5;

var RotatingLine = function() {
    this.tip = {
        x: 100,
        y: 100
    };
    this.center = {
        x: 50,
        y: 50
    };
    this.progress = 0;
    this.angle = Math.PI;
    this.radius = 50;
    this.speed = 4;
    this.direction = 1;
    this.middleX = 300;
}


RotatingLine.prototype.update = function(timeDelta) {
    this.angle += timeDelta * this.speed * this.direction;
    this.handleBouncing(timeDelta);
    this.tip = toCartesian(this.angle, this.radius, this.center);
};

RotatingLine.prototype.reset = function(newCenter) {
    this.angle = Math.PI;
    this.center = newCenter;
    this.tip = toCartesian(this.angle, this.radius, this.center);
}

RotatingLine.prototype.handleBouncing = function(timeDelta){
    if(this.angle >= MAX_ANGLE){
        this.direction *= -1;
        this.angle = MAX_ANGLE;
    }
    if(this.angle <= MIN_ANGLE){
        this.direction *= -1;
        this.angle = MIN_ANGLE;
    }
    if(this.center.x < this.middleX && this.middleX < this.tip.x){
        this.direction *= -1;
        var tmp = (this.middleX - this.center.x)/this.radius;
        this.angle = Math.acos(tmp) + Math.PI*0.5;
    }
    if(this.center.x > this.middleX && this.middleX > this.tip.x){
        this.direction *= -1;
        var tmp = (this.middleX - this.center.x)/this.radius;
        this.angle = Math.acos(tmp)+Math.PI *0.5;
    }
};


RotatingLine.prototype.draw = function(context) {
    context.beginPath();
    context.moveTo(this.center.x, this.center.y);
    context.lineTo(this.tip.x, this.tip.y);
    context.stroke();
}

RotatingLine.prototype.increaseLength = function() {
    this.radius += CHANGE_STEP;
    this.radius = Math.min(this.radius, MAX_LINE_LENGTH);
};

RotatingLine.prototype.decreaseLength = function() {
    this.radius -= CHANGE_STEP;
    this.radius =  Math.max(this.radius, 0);
};
