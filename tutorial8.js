// Piet Mondrian

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth / 2;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 8;
var step = size / 4;

var white = '#F2F5F1';
var colors = ['#D40920', '#1356A2', '#F7D842'];

var squares = [{
    x: 0,
    y: 0,
    width: size,
    height: size,
    color: white,
}]

function draw() {
    for (var i = 0; i < colors.length; i++) {
        squares[Math.floor(Math.random() * squares.length)].color = colors[i];
    }

    for (var i = 0; i < squares.length; i++) {
        context.beginPath()
        context.rect(
            squares[i].x,
            squares[i].y,
            squares[i].width,
            squares[i].height,
        );

        if (squares[i].color) {
            context.fillStyle = squares[i].color;
        } else {
            context.fillStyle = white;
        }

        context.fill();
        context.stroke();
        setTimeout(() => {}, 2)
    }
}

/**
 * Loops through the squares, and find if one should be split
 */
function splitSquaresWith(coordinates) {
    const {x , y} = coordinates;

    // Looping backwards through the squares as we're taking elements
    // out of the loop and replacing them with 2 squares. Looping
    // backwards means the order will stay the same, and new items
    // won't be split again
    for (var i = squares.length - 1; i >= 0; i--) {
        const square = squares[i]

        if (x && x > square.x && x < square.x + square.width) {
            if (Math.random() > 0.5) {
                squares.splice(i, 1)
                splitOnX(square, x)
            }
        }

        if (y && y > square.y && y < square.y + square.height) {
            if (Math.random() > 0.5) {
                squares.splice(i, 1);
                splitOnY(square, y);
            }
        }
    }
}

/**
 * Create two new squares, based on splitting the given one
 * at the given x coordinates
 */
function splitOnX(square, splitAt) {
    var squareA = {
        x: square.x,
        y: square.y,
        width: square.width - (square.width - splitAt + square.x),
        height: square.height,
    }

    var squareB = {
        x: splitAt,
        y: square.y,
        width: square.width - splitAt + square.x,
        height: square.height,
    }

    squares.push(squareA);
    squares.push(squareB);
}

/**
 * Create two new squares, based on splitting the given one
 * at the given y coordinates
 */
function splitOnY(square, splitAt) {
    var squareA = {
        x: square.x,
        y: square.y,
        width: square.width,
        height: square.height - (square.height - splitAt + square.y),
    }

    var squareB = {
        x: square.x,
        y: splitAt,
        width: square.width,
        height: square.height - splitAt + square.y,
    }

    squares.push(squareA);
    squares.push(squareB);
}

// draw()

// splitSquaresWith({x: 160})
// splitSquaresWith({y: 160})

for (var i = 0; i < size; i += step) {
    splitSquaresWith({y: i});
    splitSquaresWith({x: i});
}

draw()
