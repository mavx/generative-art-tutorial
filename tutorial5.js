var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth / 2;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 4; // Make thicker lines
context.lineCap = 'round'

var step = 20;
var aThirdOfHeight = size/3;

function draw(x, y, width, height, positions) {
    context.save();

    // Random rotations and alter translates a little,
    // to make sure rotating from center of each square
    context.translate(x + width/2, y + height/2);
    context.rotate(Math.random() * 5);
    context.translate(-width/2, -height/2);

    for (var i = 0; i <= positions.length; i++) {
        context.beginPath();
        context.moveTo(positions[i] * width, 0);
        context.lineTo(positions[i] * width, height);
        context.stroke();
        setTimeout(() => {}, 2);
    }

    context.restore();
}

for (var y = step; y < size - step; y += step) {
    for (var x = step; x < size - step; x += step) {

        // Draw more squares as we go down the screen
        if (y < aThirdOfHeight) {
            draw(x, y, step, step, [0.5]); // Draw in the middle (0.5) of each square
        } else if (y < aThirdOfHeight * 2) {
            draw(x, y, step, step, [0.2, 0.8]);
        } else {
            draw(x, y, step, step, [0.1, 0.5, 0.9]);
        }
    }
}

