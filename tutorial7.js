// Hypnotic Squares

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth / 2;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;

var finalSize = 3;
var startSteps;
var offset = 2;
var tileStep = (size - offset * 2) / 7;
var startSize = tileStep;
var directions = [-1, 0, 1];

function draw(x, y, width, height, xMovement, yMovement, steps) {
    context.beginPath()
    context.rect(x, y, width, height);
    context.stroke();
    setTimeout(() => {}, 2)

    if (steps >= 0) {
        // Calculate newSize based on how many steps our square has 
        // remaining
        var newSize = (startSize) * (steps / startSteps) + finalSize;

        // Calculate newX, newY, making sure new square fits inside
        // the previous one
        var newX = x + (width - newSize) / 2
        var newY = y + (height - newSize) / 2

        // Tile squares in a certain direction
        newX = newX - ((x - newX) / (steps + 2)) * xMovement
        newY = newY - ((y - newY) / (steps + 2)) * yMovement

        // steps - 1 which means we step closer and closer to 0
        draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
    }
}

// draw(0, 0, startSize, startSize, -1, -1, startSteps);

for (var x = offset; x < size - offset; x += tileStep) {
    for (var y = offset; y < size - offset; y += tileStep) {
        // startSteps = 3
        startSteps = 2 + Math.ceil(Math.random() * 3)

        // Tilt tiles in a random direction
        var xDirection = directions[Math.floor(Math.random() * directions.length)]
        var yDirection = directions[Math.floor(Math.random() * directions.length)]

        draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1)
    }
}

