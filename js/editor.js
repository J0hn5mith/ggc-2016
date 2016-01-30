function Editor() {


    this.shapes = [];

    this.color = "#ff0000";
    this.newShape = [];

    this.showPoints = true;


    this.init = function() {
    };


    this.back = function() {
        if(this.newShape.length > 0) {
            this.newShape.pop();
        }
    };


    this.setColor = function(color) {
        this.color = color;
    };


    this.addPos = function(pos) {
        var closestPoint = this.getClosestPoint(pos);
        if(distance(closestPoint.x, closestPoint.y, pos.x, pos.y) < 5) {
            pos = closestPoint;
        }
        this.newShape.push(pos);
    };


    this.getClosestPoint = function(pos) {
        var closest = { x : -1000, y : -1000 };
        var closestDst = 10000;
        for(var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            for(var j = 0; j < shape.shape.length; j++) {
                var point = shape.shape[j];
                var pDst = distance(pos.x, pos.y, point.x, point.y);
                if(pDst < closestDst) {
                    closest = { x : point.x, y : point.y };
                    closestDst = pDst;
                }
            }
        }
        return closest;
    };


    this.promptSetColor = function () {
        var newColor = window.prompt("Enter Color", this.color);
        if(newColor != null) {
            this.color = newColor;
        }
    };


    this.save = function () {
        if(this.newShape.length > 0) {
            var shape = {
                shape : this.newShape,
                color : this.color,
            };
            this.shapes.push(shape);
            this.newShape = [];
        }
    };


    this.print = function () {
        this.save();
        var string = "";
        for(var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            string += "{\n";
            string += "\tcolor : \"" + shape.color + "\",\n";
            string += "\tshape : [\n";
            for(var j = 0; j < shape.shape.length; j++) {
                string += "\t\t{ x : " + shape.shape[j].x + ", y : " + shape.shape[j].y + " }";
                if(j == shape.shape.length - 1) {
                    string += "\n";
                } else {
                    string += ",\n";
                }
            }
            string += "\t]\n";
            string += "},\n";
            jQuery("#editor_output").val(string);
        }
    };


    this.load = function() {
        var input = window.prompt("Enter Input", "");
        if(input != null) {
            input = input.replace(/\t/g, '');
            input = input.replace(/\n/g, '');
            input = input.replace(/\r/g, '');
            eval("editor.shapes = [" + input + "];");
        }
    };


    this.clear = function () {
        this.shapes = [];
        this.newShape = [];
    };


    this.togglePoints = function() {
        this.showPoints = !this.showPoints;
    };


    this.draw = function() {
        for(var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            this.drawShape(shape.shape, shape.color);
        }
        this.drawShape(this.newShape, this.color);

        if(this.showPoints) {
            for(var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                this.drawPoints(shape.shape, 2);
            }
            this.drawPoints(this.newShape, 1);
        }
    };


    this.drawShape = function(shape, color) {

        if(shape.length == 1) {
            c.fillStyle = color;
            c.fillRect(shape[0].x - 2, shape[0].y - 2, 4, 4);

        } else if(shape.length == 2) {
            c.strokeStyle = color;
            c.beginPath();
            c.moveTo(shape[0].x, shape[0].y);
            c.lineTo(shape[1].x, shape[1].y);
            c.closePath();
            c.stroke();

        } else if(shape.length > 2) {
            c.fillStyle = color;
            c.beginPath();
            c.moveTo(shape[0].x, shape[0].y);
            for(var i = 1; i < shape.length; i++) {
                c.lineTo(shape[i].x, shape[i].y);
            }
            c.closePath();
            c.fill();
        }
    };


    this.drawPoints = function(shape, mode) {

        if(mode == 1) {
            for(var i = 0; i < shape.length; i++) {
                c.fillStyle = "#000";
                c.fillRect(shape[i].x - 3, shape[i].y - 3, 6, 6);
                c.fillStyle = "#fff";
                c.fillRect(shape[i].x - 2, shape[i].y - 2, 4, 4);
            }

        } else if(mode == 2) {
            c.globalAlpha = 0.5;
            c.fillStyle = "#000";
            for(var i = 0; i < shape.length; i++) {
                c.fillRect(shape[i].x - 2, shape[i].y - 2, 4, 4);
            }
            c.globalAlpha = 1.0;
        }
    };

}