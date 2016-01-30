var Segment = function(start, end) {
    this.start = start;
    this.end = end;
};

Segment.prototype.draw = function(context) {
    context.beginPath();
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.end.x, this.end.y);
    context.stroke();
}

Segment.prototype.projectY = function(y) {
    var m = (this.end.x - this.start.x) / (this.end.y - this.start.y)
    var x = this.end.x + (y - this.end.y) * m
    return x;

}


var Path = function() {
    this.segments = [];
    this.level = 0;
    this.heightIndex = [];
}

Path.prototype.draw = function() {
    if (this.segments.length == 0) {
        return;
    }
    var first = this.segments[0];
    c.beginPath();
    c.moveTo(first.start.x, first.start.y);
    for (var i = 0; i < this.segments.length; i++) {
        var segment = this.segments[i];
        c.lineTo(segment.end.x, segment.end.y);
    }
    c.stroke();
    //this.drawHeightIndex();
}

Path.prototype.drawHeightIndex = function() {
    for (var i in this.heightIndex) {
        var heightIndex = this.heightIndex[i];
        c.beginPath();
        c.moveTo(heightIndex.x, heightIndex.y);
        c.lineTo(300, heightIndex.y);
        c.stroke();
    }
}

Path.prototype.extend = function(position, _offset) {
    var offset = typeof _offset !== 'undefined'? _offset: 0;
    if (!this.segments.length > 0) {
        this.addSegment({
            x: 0,
            y: 0
        }, position);
    }
    var last = this.segments[this.segments.length - 1];
    this.addSegment(last.end, position, offset);
}

Path.prototype.extendByList = function(points, _offset) {
    var offset = typeof _offset !== 'undefined'? _offset: 0;
    if (this.segments.length > 0) {
        for (var i = 0; i < points.length; i++) {
            this.extend(points[i], offset);
        }
    }
}

Path.prototype.addSegment = function(start, end, _offset) {
    var offset = typeof _offset !== 'undefined'? _offset: 0;
    start.y += offset;
    end.y += offset;
    this.segments.push(new Segment(start, end));
    //console.log(this);
    this.updateHeightIndex();
};

Path.prototype.getHeight = function() {
    return this.segments[this.segments.length - 1].end.y;
};

Path.prototype.getStartY = function() {
    return this.segments[0].start.y;
};

Path.prototype.updateHeightIndex = function() {
    if (!this.segments.length > 0) {
        return;
    }

    this.heightIndex = [];
    for (var y = this.getStartY(); y > this.getHeight(); y -= 10) {
        var  segment = this.findSegmentForY(y);
        var x = segment.projectY(y);
        this.heightIndex.push({
            x: x,
            y: y
        });
    }
};

Path.prototype.findSegmentForY = function(y) {
    return findSegmentForY(this, y);
};

function comparePaths(path1, path2) {
    var height = Math.max(path1.getHeight(), path2.getHeight());
    var score = 0

    for (var y = 0; y >= height; y--) {
        var s1 = findSegmentForY(path1, y);
        var s2 = findSegmentForY(path2, y);
        var x1 = s1.projectY(y);
        var x2 = s2.projectY(y);
        score += 100 - Math.abs(x1 - x2)
    }
    console.log(score / 100);
};

function findSegmentForY(path, y) {
    for (var i = 0; i < path.segments.length; i++) {
        var segment = path.segments[i];
        if (segment.start.y >= y && segment.end.y <= y) {
            return segment;
        }
    }
}
