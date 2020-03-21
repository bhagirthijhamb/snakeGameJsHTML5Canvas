$(document).ready(function(){
    const canvas = $('#canvas')[0]; // select the canvas
    const ctx = canvas.getContext('2d');

    // snake, an array of objects(each array has x and y position)
    const snake = [
        { x: 50, y: 100, oldX: 0, oldY: 0 }, // head
        { x: 50, y: 90, oldX: 0, oldY: 0 }, // body
        { x: 50, y: 80, oldX: 0, oldY: 0 } // body
    ];

    const snakeWidth = snakeHeight = 10;

    // ctx.fillStyle = 'red';
    // ctx.fillRect(50, 100, 10, 10);

    drawSnake();

    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    // draw snake
    function drawSnake() {
        $.each(snake, function (index, value) {
            ctx.fillStyle = 'red';
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            ctx.strokeStyle = 'white';
            ctx.strokeRect(value.x, value.y, snakeWidth, snakeHeight);
        });
    } 
});