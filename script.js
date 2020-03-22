$(document).ready(function(){
    const canvas = $('#canvas')[0]; // select the canvas
    const ctx = canvas.getContext('2d');

    // snake, an array of objects(each array has x and y position)
    const snake = [
        { x: 50, y: 100, oldX: 0, oldY: 0 }, // head
        { x: 50, y: 90, oldX: 0, oldY: 0 }, // body
        { x: 50, y: 80, oldX: 0, oldY: 0 } // body
    ];

    // food object
    let food = { x: 200, y: 200, eaten: false };

    const snakeWidth = snakeHeight = 10;
    const blockSize = 10;

    // ctx.fillStyle = 'red';
    // ctx.fillRect(50, 100, 10, 10);

    // constants for the keys to be used control the snake
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    // set the key press to be down key when the game starts
    let keyPressed = down;
    let score = 0;
    let game;

    // to move the snake
    game = setInterval(gameLoop, 400);

    function gameLoop() {
        // console.log('loop running'); // check if loop is running
        clearCanvas();
        drawFood();
        moveSnake(); // call moveSnake before drawSnake() 
        drawSnake(); // call drawSnake() every 1s        
    }

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

            // All the operations are done for the head
            // head eats food & head collides itself and sides
            if(index == 0) {
                // game over condition, head hitting own body
                if(collided(value.x, value.y)){
                    // console.log('game over');
                    gameOver();
                }

                if(didEatFood(value.x, value.y)) {
                    // console.log('Yeyy food !');
                    score++;
                    $('#score').text(score);
                    makeSnakeBigger();
                    food.eaten = true
                }
            }
        });
    } 

    function makeSnakeBigger() {
        snake.push({
            x: snake[snake.length - 1].oldX,
            y: snake[snake.length - 1].oldY
        })
    }

    function collided(x, y) {
        return snake.filter(function(value, index){
            return index != 0 && value.x == x && value.y == y;
        }).length > 0 || x < 0 || x > canvas.width || y < 0 || y > canvas.height;
    }

    // draw Food
    function drawFood() {
        ctx.fillStyle = 'yellow';
        if(food.eaten == true){
            food = getNewPositionForFood();
        }
        ctx.fillRect(food.x, food.y, snakeWidth, snakeHeight);
    }

    //
    function didEatFood(x, y) {
        return food.x == x && food.y == y;
    }


    // clear canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Listen for the 'keydown' event
    $(document).keydown(function(e) {
        // keyPressed = e.which;
        // console.log(keyPressed);

        // make sure the key pressed is one of up, down, left, right
        if ($.inArray(e.which, [down, up, left, right]) != -1){ // otherwise dont do anything
            keyPressed = checkKeyIsAllowed(e.which);
        }
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

    // Game over function
    function gameOver() {
        clearInterval(game);
        alert('Game Over');
    }

    // Foods new position should not be on the snakeitself
    function getNewPositionForFood(){
        // get all the xs and ys from snake body
        let xArr = yArr = [], xy;
        $.each(snake, function(index, value){
            if($.inArray(value.x, xArr) != -1){
                xArr.push(value.x);
            }
            if($.inArray(value.y, yArr) == -1) {
                yArr.push(value.y);
            }
        });
        xy = getEmptyXY(xArr, yArr);
        return xy;
    }

    function getEmptyXY(xArr, yArr) {
        let newX, newY;
        newX = getRandomNumber(canvas.width - 10, 10);
        newY = getRandomNumber(canvas.height - 10, 10);

        // check if this x and y together are not where the position (current) of the snake is
        if($.inArray(newX, newY) == -1 && $.inArray(newY, yArr) != -1) {
            return  {
                x: newX,
                y: newY,
                eaten: false
            };
        } else {
            return getEmptyXY(xArr, yArr);
        }
    }

    function getRandomNumber(max, multipleOf) {
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result % 10);
        return result;
    }
});

// whenever snake eats food push one object to the last position of the array for last box of snake body