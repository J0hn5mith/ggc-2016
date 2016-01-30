var Segment = function(start, end) {
    this.start = start;
    this.end = end;
}

Segment.prototype.draw = function(context) {
    context.beginPath();
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.end.x, this.end.y);
    context.stroke();
}


var Path = function() {
    this.segments = [];
    this.level = 0;
    this.heightIndex = [];
}

Path.prototype.draw = function(context) {
    if (this.segments.length == 0) {
        return;
    }
    var first = this.segments[0];

    context.beginPath();
    context.moveTo(first.start.x, first.start.y);

    for (segment of this.segments) {
        context.lineTo(segment.end.x, segment.end.y);
    }

    context.stroke();
    this.drawHeightIndex(context);
}

Path.prototype.drawHeightIndex = function(context) {
    for (var iHeightIndex of this.heightIndex) {
        context.beginPath();
        context.moveTo(iHeightIndex.x, iHeightIndex.y);
        context.lineTo(300, iHeightIndex.y);
        context.stroke();
    }
}

Path.prototype.extend = function(position) {
    if (!this.segments.length > 0) {
        this.addSegment({
            x: 0,
            y: 0
        }, position);
    }
    var last = this.segments[this.segments.length - 1];
    this.addSegment(last.end, position);
}

Path.prototype.addSegment = function(start, end) {
    this.segments.push(
        new Segment(start, end)
    )
    this.updateHeigthIndex();
}

Path.prototype.updateHeigthIndex = function() {
    if (!this.segments.length > 0) {
        return;
    }

    var nextHeight;
    var newHeight = this.segments[this.segments.length - 1].end.y;
    if (!this.heightIndex.length > 0) {
        nextHeight = BASE_LINE;
    } else {
        var lastHeightIndex = this.heightIndex[this.heightIndex.length - 1];
        var lastHeight;
        if (lastHeightIndex.y % 10 != 0) {
            nextHeight = lastHeightIndex + 10 - lastHeightIndex % 10;
            this.heightIndex.pop();
        } else {
            lastHeight = lastHeightIndex.y;
        }
        nextHeight = lastHeight - 10;
    }

    for (var y = nextHeight; y > newHeight; y -= 10) {
        segment = this.findSegmentForY(y);
        var m = (segment.end.x - segment.start.x) / (segment.end.y - segment.start.y)
        var x = segment.end.x + (y - segment.end.y) * m
        this.heightIndex.push({
            x: x,
            y: y
        });

    }
}

Path.prototype.findSegmentForY = function(y) {
    for (var segment of this.segments) {
        if (segment.start.y >= y && segment.end.y <= y) {
            return segment;
        }
    }
}

function comparePaths(path1, path2) {
    for (segment of path1) {
        // find closest 
    }
}
