function Background() {


    this.init = function() {

    };


    this.drawSky = function() {
        var grad = c.createLinearGradient(0, -2000, 0, 50);
        grad.addColorStop(0, "#003");
        grad.addColorStop(0.5, "#09f");
        grad.addColorStop(1, "#9cf");

        c.fillStyle = grad;
        c.fillRect(0, -500, 600, 600);
    };


    this.drawHill = function() {

        c.translate(0, -500);

        for(var i = 0; i < Background.elements.length; i++) {
            var shape = Background.elements[i];
            if(shape.shape.length > 2) {
                c.fillStyle = shape.color;
                c.beginPath();
                c.moveTo(shape.shape[0].x, shape.shape[0].y);
                for(var j = 1; j < shape.shape.length; j++) {
                    var point = shape.shape[j];
                    c.lineTo(point.x, point.y);
                }
                c.closePath();
                c.fill();
            }
        }

        c.translate(0, 500);
    };

}


Background.elements = [
    {
        color : "#333333",
        shape : [
            { x : 0, y : 600 },
            { x : 16, y : 579 },
            { x : 30, y : 576 },
            { x : 41, y : 558 },
            { x : 61, y : 550 },
            { x : 78, y : 535 },
            { x : 91, y : 522 },
            { x : 116, y : 520 },
            { x : 137, y : 503 },
            { x : 142, y : 500 },
            { x : 455, y : 500 },
            { x : 495, y : 512 },
            { x : 518, y : 513 },
            { x : 521, y : 521 },
            { x : 533, y : 536 },
            { x : 547, y : 543 },
            { x : 558, y : 550 },
            { x : 560, y : 561 },
            { x : 573, y : 569 },
            { x : 578, y : 577 },
            { x : 584, y : 583 },
            { x : 596, y : 594 },
            { x : 600, y : 600 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 0, y : 600 },
            { x : 16, y : 579 },
            { x : 16, y : 596 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 30, y : 576 },
            { x : 40, y : 582 },
            { x : 41, y : 558 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 61, y : 550 },
            { x : 87, y : 567 },
            { x : 91, y : 522 },
            { x : 78, y : 535 },
            { x : 61, y : 550 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 116, y : 520 },
            { x : 137, y : 519 },
            { x : 142, y : 500 },
            { x : 137, y : 503 },
            { x : 116, y : 520 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 91, y : 522 },
            { x : 87, y : 544 },
            { x : 116, y : 520 },
            { x : 91, y : 522 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 142, y : 500 },
            { x : 137, y : 519 },
            { x : 199, y : 514 },
            { x : 258, y : 529 },
            { x : 340, y : 509 },
            { x : 390, y : 510 },
            { x : 439, y : 504 },
            { x : 455, y : 500 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 495, y : 512 },
            { x : 511, y : 522 },
            { x : 518, y : 513 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 41, y : 558 },
            { x : 40, y : 582 },
            { x : 61, y : 550 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 16, y : 596 },
            { x : 40, y : 582 },
            { x : 30, y : 576 },
            { x : 16, y : 579 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 111, y : 549 },
            { x : 135, y : 535 },
            { x : 171, y : 534 },
            { x : 130, y : 548 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 307, y : 556 },
            { x : 350, y : 541 },
            { x : 400, y : 541 },
            { x : 384, y : 552 }
        ]
    },
    {
        color : "#555555",
        shape : [
            { x : 440, y : 559 },
            { x : 500, y : 534 },
            { x : 547, y : 557 },
            { x : 489, y : 546 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 111, y : 549 },
            { x : 113, y : 571 },
            { x : 130, y : 548 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 307, y : 556 },
            { x : 308, y : 580 },
            { x : 359, y : 553 },
            { x : 307, y : 556 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 440, y : 559 },
            { x : 450, y : 578 },
            { x : 489, y : 546 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 137, y : 519 },
            { x : 135, y : 535 },
            { x : 199, y : 514 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 258, y : 529 },
            { x : 343, y : 525 },
            { x : 340, y : 509 }
        ]
    },
    {
        color : "#222222",
        shape : [
            { x : 384, y : 552 },
            { x : 424, y : 577 },
            { x : 400, y : 541 }
        ]
    },
    {
        color : "#222222",
        shape : [
            { x : 547, y : 557 },
            { x : 548, y : 578 },
            { x : 523, y : 553 }
        ]
    },
    {
        color : "#222222",
        shape : [
            { x : 560, y : 561 },
            { x : 548, y : 578 },
            { x : 600, y : 600 },
            { x : 596, y : 594 },
            { x : 584, y : 583 },
            { x : 578, y : 577 },
            { x : 573, y : 569 }
        ]
    },
    {
        color : "#222222",
        shape : [
            { x : 511, y : 522 },
            { x : 547, y : 557 },
            { x : 533, y : 536 },
            { x : 521, y : 521 },
            { x : 518, y : 513 }
        ]
    },
    {
        color : "#222222",
        shape : [
            { x : 343, y : 525 },
            { x : 390, y : 510 },
            { x : 340, y : 509 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 136, y : 582 },
            { x : 188, y : 555 },
            { x : 244, y : 555 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 194, y : 595 },
            { x : 241, y : 579 },
            { x : 267, y : 581 },
            { x : 292, y : 575 },
            { x : 297, y : 588 }
        ]
    },
    {
        color : "#222222",
        shape : [
            { x : 136, y : 582 },
            { x : 226, y : 575 },
            { x : 244, y : 555 }
        ]
    },
    {
        color : "#444444",
        shape : [
            { x : 50, y : 599 },
            { x : 65, y : 580 },
            { x : 119, y : 581 },
            { x : 110, y : 592 },
            { x : 78, y : 587 }
        ]
    },
    {
        color : "#222222",
        shape : [
            { x : 258, y : 529 },
            { x : 307, y : 556 },
            { x : 350, y : 541 },
            { x : 343, y : 525 }
        ]
    },
];