// Triangular Mesh

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth / 2;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineJoin = 'bevel';

var line, dot;
var odd = false;
var lines = []
var gap = size / 8

// Create grid
for (var y = gap / 2; y <= size; y += gap) {
    odd = !odd;
    line = []
    for (var x = gap / 4; x <= size; x += gap) {

        // Randomize dot displacements
        dot = {
            x: x + (Math.random()*.8 - .4) * gap + (odd ? gap/2 : 0),
            y: y + (Math.random()*.8 - .4) * gap
        }
        line.push(dot)
        context.beginPath();
        context.arc(dot.x, dot.y, 1, 0, 2 * Math.PI, true)
        context.fill();
        setTimeout(() => {}, 5);
    }
    lines.push(line);
}

function drawTriangle(pointA, pointB, pointC) {
    context.beginPath();
    context.moveTo(pointA.x, pointA.y);
    context.lineTo(pointB.x, pointB.y);
    context.lineTo(pointC.x, pointC.y);
    context.lineTo(pointA.x, pointA.y);
    context.closePath();
    context.stroke();

    // Fill style
    var gray = Math.floor(Math.random() * 16).toString(16);
    context.fillStyle = '#' + gray + gray + gray;
    context.fill();

    setTimeout(() => {}, 2);
}

var dotLine;
odd = true;

// Connect dots to form triangles
for (var y = 0; y < lines.length - 1; y++) {
    odd = !odd;
    dotLine = [];
    for (var i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i] : lines[y+1][i])
        dotLine.push(odd ? lines[y+1][i] : lines[y][i])
    }

    for (var i = 0; i < dotLine.length - 2; i++) {
        drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2])
    }
}
