// Tiled Lines

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr / 2;
canvas.height = size * dpr / 2;
context.scale(dpr, dpr);

context.lineCap = 'square';
context.lineWidth = 2;

console.log("gm")

console.log(`Canvas - [size: ${size}, dpr: ${dpr}, width: ${canvas.width}, height: ${canvas.height}`)

function draw(x, y, width, height) {
    var leftToRight = Math.random() >= 0.5;

    if (leftToRight) {
        context.moveTo(x, y)
        context.lineTo(x + width, y + height)
    } else {
        context.moveTo(x + width, y)
        context.lineTo(x, y + height)
    }

    context.stroke();
    setTimeout(() => {}, 10) // Avoid freezing browser
  }
  
// draw(0, 0, size, size);

var step = 20
for (var x = 0; x < size; x += step) {
    for (var y = 0; y < size; y += step) {
        draw(x, y, step, step)
    }
}