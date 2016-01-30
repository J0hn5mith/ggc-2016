var CHANGE_STEP = 50;
var MIN_LINE_LENGTH = 20;
var MAX_LINE_LENGTH = 100;
var MIN_ANGLE = (Math.PI * 0.5) + 0.0001;
var MAX_ANGLE = (Math.PI * 1.5) - 0.0001;


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
    this.speed = 5;
    this.direction = 1;
    this.middleX = 300;
    this.side = -1;
};


RotatingLine.prototype.update = function(timeDelta) {
    this.angle += timeDelta * this.speed * this.direction;
    this.handleBouncing();
    this.tip = toCartesian(this.angle, this.radius, this.center);
};


RotatingLine.prototype.reset = function(side, newCenter) {
    this.side = side;
    this.angle = Math.PI;
    this.center = newCenter;
    this.tip = toCartesian(this.angle, this.radius, this.center);
};


RotatingLine.prototype.handleBouncing = function(){
    if(this.angle >= MAX_ANGLE){
        this.direction *= -1;
        this.angle = MAX_ANGLE - (this.angle - MAX_ANGLE);
    }
    if(this.angle <= MIN_ANGLE){
        this.direction *= -1;
        this.angle = MIN_ANGLE - (this.angle - MIN_ANGLE);
    }
    var newTip = toCartesian(this.angle, this.radius, this.center);
    if((this.side == -1 && newTip.x >= this.middleX) ||
        (this.side == 1 && newTip.x <= this.middleX)) {
        this.direction *= -1;
        var tmp = (this.middleX - this.center.x) / this.radius;
        var bounceAngle = Math.acos(tmp) + Math.PI * 0.5;
        this.angle = bounceAngle - (this.angle - bounceAngle);
    }
};


RotatingLine.prototype.draw = function(context) {
    c.beginPath();
    c.moveTo(this.center.x, this.center.y);
    c.lineTo(this.tip.x, this.tip.y);
    c.stroke();
};


RotatingLine.prototype.increaseLength = function() {
    this.radius += CHANGE_STEP * timer.delta;
    this.radius = Math.min(this.radius, MAX_LINE_LENGTH);
};


RotatingLine.prototype.decreaseLength = function() {
    this.radius -= CHANGE_STEP * timer.delta;
    this.radius =  Math.max(this.radius, MIN_LINE_LENGTH);
};
