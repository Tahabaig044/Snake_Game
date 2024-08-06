// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const foodSound1 = new Audio('music/hiss3-103123.mp3');
// const foodSound1 = new Audio('chin_tapak_dum_dum.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.');
const mSound = new Audio('music/90s-game-ui-6-185099.mp3');
let speed = 18;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 };
food1 = { x: 5, y: 8 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    function scoreFive(add) {
        if ( score === 10 | score === 20 | score === 30 | score === 40 | score === 50
             | score === 60 | score === 70 | score === 80 | score === 90 | score === 100) {
            mSound.play()
            if (snakeArr[0].y === food1.y && snakeArr[0].x === food1.x) {
                foodSound1.play();
                score += 5;
                if (score > hiscoreval) {
                    hiscoreval = score;
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
                }
                scoreBox.innerHTML = "Score: " + score;
                snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
                let a = 2;
                let b = 16;
                food1 = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
            }
        }
    }
    scoreFive()

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    if (mSound | score === 10 | score === 20 | score === 30 | score === 40 | score === 50 | score === 60 | score === 70 | score === 80 | score === 90 | score === 100) {
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food1.y;
        foodElement.style.gridColumnStart = food1.x;
        foodElement.classList.add('food1')
        board.appendChild(foodElement);
    }


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const leftButton = document.querySelector('.left');
    const upButton = document.querySelector('.up');
    const downButton = document.querySelector('.down');
    const rightButton = document.querySelector('.right');
  
    leftButton.addEventListener('click', () => {
        inputDir.x = -1;
        inputDir.y = 0;
      snake.direction = 'left';
      moveSound.play();
    });
  
    upButton.addEventListener('click', () => {
        inputDir.x = 0;
        inputDir.y = -1;
      snake.direction = 'up';

      moveSound.play();
    });
  
    downButton.addEventListener('click', () => {
        inputDir.x = 0;
        inputDir.y = 1;
      snake.direction = 'down';
        moveSound.play();
    });
  
    rightButton.addEventListener('click', () => {
        inputDir.x = 1;
        inputDir.y = 0;
      snake.direction = 'right';
      moveSound.play();
    });
  });
// js/index.js
// class Snake {
//     constructor() {
//       this.score = 0;
//       this.highScore = 0;
//       this.direction = 'right';
//       this.snakeBody = [];
//     }
  
//     updateScore() {
//       document.getElementById('scoreBox').innerText = `Score: ${this.score}`;
//     }
  
//     updateHighScore() {
//       document.getElementById('hiscoreBox').innerText = `HighScore: ${this.highScore}`;
//     }
  
//     moveSnake() {
//       // TO DO: implement snake movement logic
//     }
//   }
  
//   const snake = new Snake();
  
//   document.addEventListener('DOMContentLoaded', () => {
//     const leftButton = document.querySelector('.left');
//     const upButton = document.querySelector('.up');
//     const downButton = document.querySelector('.down');
//     const rightButton = document.querySelector('.right');
  
//     leftButton.addEventListener('click', () => {
//       snake.direction = 'left';
//     });
  
//     upButton.addEventListener('click', () => {
//       snake.direction = 'up';
//     });
  
//     downButton.addEventListener('click', () => {
//       snake.direction = 'down';
//     });
  
//     rightButton.addEventListener('click', () => {
//       snake.direction = 'right';
//     });
//   });