var RotatingLine = function(){
    this.tip = {x: 100, y: 100};
    this.center = {x: 50, y: 50};
    this.progress = 0;
    this.radius = 100;
}


RotatingLine.prototype.update = function(time_delta){
    this.progress += time_delta;
    this.tip = toCartesian(this.progress, this.radius, this.center);
}


RotatingLine.prototype.draw = function(context){
    context.beginPath();
    context.moveTo(this.center.x, this.center.y);
    context.lineTo(this.tip.x, this.tip.y);
    context.stroke();
}
