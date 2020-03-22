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
    const blockSize = 10;

    // ctx.fillStyle = 'red';
    // ctx.fillRect(50, 100, 10, 10);

    // to move the snake
    setInterval(gameLoop, 300);

    function gameLoop() {
        // console.log('loop running'); // check if loop is running
        clearCanvas();
        moveSnake(); // call moveSnake before drawSnake() 
        drawSnake(); // call drawSnake() every 1s
        
    }   


    // constants for the keys to be used control the snake
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    // set the key press to be down key when the game starts
    let keyPressed = down;

    // Move the snake
    // head will move (will write logic for this), others square will follow the head block

    function moveSnake() {
        $.each(snake, function (index, value) {
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;

            // head
            if (index == 0) {
                if (keyPressed === down) {
                    snake[index].y = value.y + blockSize;
                } else if (keyPressed === up) {
                    snake[index].y = value.y - blockSize;
                } else if (keyPressed === right) {
                    snake[index].x = value.x + blockSize;
                } else if (keyPressed === left) {
                    snake[index].x = value.x - blockSize;
                }
            } 
            // body
            else {
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
            }
        });
    }


    drawSnake();

    // draw snake
    function drawSnake() {
        $.each(snake, function (index, value) {
            ctx.fillStyle = 'red';
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            ctx.strokeStyle = 'white';
            ctx.strokeRect(value.x, value.y, snakeWidth, snakeHeight);
        });
    } 

    // clear canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Listen for the 'keydown' event
    $(document).keydown(function(e) {
        // keyPressed = e.which;
        // console.log(keyPressed);

        keyPressed = checkKeyIsAllowed(e.which);
    });

    // Check if the key is allowed
    function checkKeyIsAllowed(tempKey) {
        let key;
        if (tempKey == down) {
            key = (keyPressed != up) ? tempKey : keyPressed;
        } else if (tempKey == up) {
            key = (keyPressed != down) ? tempKey : keyPressed;
        } else if (tempKey == left) {
            key = (keyPressed != right) ? tempKey : keyPressed;
        } else if (tempKey == right) {
            key = (keyPressed != left) ? tempKey : keyPressed;
        }
        return key;
    }
});