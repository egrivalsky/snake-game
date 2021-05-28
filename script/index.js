let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);

});

function createBoard() {
    popup.style.display = "none";
    console.log("createboard invoked")
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}

function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares)
        direction = 1;
        scoreDisplay.innerHTML= score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0]
        currentIndex = 0;
        currentSnake.forEach((index) => squares[index].classList.add("snake"));
        interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if(checkForHits(squares)) {
        alert("You hit something!");
        popup.style.display="flex";
        return clearInterval(interval)
    } else {
        moveSnake(squares);
    }
}

function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares(tail).classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    //movement ends here
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake")
}

function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ){
        return true;    
    } else {
        return false;
    }
}

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

//copied from https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/
function control(e) {
    if (e.keycode === 39) {
      direction = 1; // right
    } else if (e.keycode === 38) {
      direction = -width; // up --if we press the up arrow, the snake will go ten divs up
    } else if (e.keycode === 37) {
      direction = -1; // left, the snake will go left one div
    } else if (e.keycode === 40) {
      direction = +width; // down -- the snake head will instantly appear 10 divs below from the current div
    }
  }