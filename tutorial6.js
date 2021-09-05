var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth / 2;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;

/**
 * 1. Create a new Circle
 * 2. Check to see if the circle collides with any other circles
 * 3. If it doesn't collide, we will grow it slightly, and recheck #2
 * 4. Repeat these steps until we have a collision, or we reach "max size"
 * 5. Create another circle and repeat `x` times
 */

var circles = []
var minRadius = 2
var maxRadius = 80
var totalCircles = 500
var createCircleAttempts = 500

/**
 * Loop through from 0 to createCircleAttempts
 * trying to create a circle
 * 
 * Once we have a circle created, grow it until
 * it hits another, or reaches max size
 * 
 * Draw the circle
 */
function createAndDrawCircle() {
    // Check collision on creation, as new circles might appear
    // inside others
    var newCircle;
    var circleSafeToDraw = false;
    for (var tries = 0; tries < createCircleAttempts; tries++) {
        newCircle = {
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size),
            radius: minRadius,
        }

        if (doesCircleCollide(newCircle)) {
            continue;
        } else {
            circleSafeToDraw = true;
            break;
        }
    }

    if (!circleSafeToDraw) {
        return;
    }

    // Grow circles
    for (var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
        newCircle.radius = radiusSize;
        if (doesCircleCollide(newCircle)) {
            newCircle.radius--;
            break;
        }
    }

    circles.push(newCircle);
    context.beginPath()
    context.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*Math.PI);
    context.stroke()
    setTimeout(() => {}, 2)
}

/**
 * Return true or false depending on whether the circle
 * collides with another
 */
function doesCircleCollide(circle) {
    // Check for collision with wall
    if (circle.x + circle.radius >= size ||
        circle.x - circle.radius <= 0) {
            return true;
        }

    if (circle.y + circle.radius >= size ||
        circle.y - circle.radius <= 0) {
            return true;
        }

    // Get distance between 2 center points via pythagoras' theorem
    for (var i = 0; i < circles.length; i++) {
        var otherCircle = circles[i];
        var a = circle.radius + otherCircle.radius;
        var x = circle.x - otherCircle.x;
        var y = circle.y - otherCircle.y;

        if (a >= Math.sqrt((x*x) + (y*y))) {
            return true;
        }
    }

    return false;
}

for (var i = 0; i < totalCircles; i++) {
    createAndDrawCircle()
}
