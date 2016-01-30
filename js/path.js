var Segment = function(start, end){
    this.start = start;
    this.end = end;
}

Segment.prototype.draw = function(context){
    context.beginPath();
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.end.x, this.end.y);
    context.stroke();
}


var Path = function(){
    this.segments = [ ];
    this.level = 0;
}

Path.prototype.draw = function(context){
    if(this.segments.length == 0){
        return;
    }
    var first = this.segments[0];

    context.beginPath();
    context.moveTo(first.start.x, first.start.y);

    for(segment of this.segments){
        context.lineTo(segment.end.x, segment.end.y);
    }
    context.stroke();
}

Path.prototype.extend = function(position){
    if(!this.segments.length > 0){
        this.addSegment({x:0, y:0}, position);
    }
    var last = this.segments[this.segments.length - 1];
    this.addSegment(last.end, position);

}

Path.prototype.addSegment = function(start, end){
        this.segments.push(
                new Segment(start, end)
                    )
}
