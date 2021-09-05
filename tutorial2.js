// Joy Division

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth / 2;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;

var step = 10;
var lines = [];

// Create the lines
for (var i = step; i <= size; i += step) {
    var line = [];
    for (var j = step; j <= size - step; j += step) {

        // Distort more towards the center
        var distanceToCenter = Math.abs(j - size / 2)
        var variance = Math.max(size / 2 - 50 - distanceToCenter, 0)
        var random = Math.random() * variance / 2 * -1;

        // Displace the lines
        // var random = Math.random() * 10;
        var point = {x: j, y: i + random};

        line.push(point);
    }
    lines.push(line);
}

// Draw the lines
for (var i = 5; i < lines.length; i++) {
    context.beginPath();
    context.moveTo(lines[i][0].x, lines[i][0].y);

    // Create smoother line curves
    for(var j = 0; j < lines[i].length - 2; j++) {
        var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
        var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
        context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
      }

    context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);

    // "Erase" our new shape from existing lines above it
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.fill();
    context.restore();

    context.stroke();
    setTimeout(() => {}, 5);
}
