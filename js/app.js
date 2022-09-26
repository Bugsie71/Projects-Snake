// Canvas & Game Setup
let canvas;
let c;
let gameActive = true;
let score = 0;
const framesPerSecond = 1000 / 10;
const pixelSize = 25;
const col = 20;
const row = 20;
const snake = new Snake(0, col / 2, row / 2);
const snakeBody = [snake];
const foods = [];
let canTurn = true;
let animateInterval;

const scoreDisplay = document.querySelector(".score");
const scoreDisplayEnd = document.querySelector(".end-score");
const endGameContainer = document.querySelector(".end-game-container");
const retryBtn = document.querySelector("#retry-btn");

window.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("canvas");
  c = canvas.getContext("2d");

  canvas.width = col * pixelSize;
  canvas.height = row * pixelSize;

  createFood();
  animateInterval = setInterval(animate, framesPerSecond);
});

window.addEventListener("keydown", (e) => snake.changeDirection(e.code));

// Animate
const animate = () => {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  scoreDisplay.textContent = score;

  drawSnakeBody();

  if (snake.x < 0 || snake.x >= col || snake.y < 0 || snake.y >= row) {
    gameActive = false;
  }

  if (!gameActive || score === col * row) endGame();

  foods.forEach((food) => {
    food.draw();

    handleSnakeEatingFood(snake, food);
  });
};

// Functions
const createFood = () => {
  foods.pop();

  const notAllowed = [];
  let x = Math.floor(Math.random() * col);
  let y = Math.floor(Math.random() * row);
  let cords = `${x},${y}`;

  snakeBody.forEach((body) => {
    notAllowed.push(`${body.x},${body.y}`);
  });

  while (notAllowed.includes(cords)) {
    x = Math.floor(Math.random() * col);
    y = Math.floor(Math.random() * row);

    cords = `${x},${y}`;
  }

  foods.push(new Food(x, y));
};

const growSnake = (x, y) => {
  const time = snakeBody.length * framesPerSecond;

  setTimeout(() => {
    snakeBody.push(new Snake(snakeBody.length, x, y));
  }, time);
};

const drawSnakeBody = () => {
  for (let i = snakeBody.length - 1; i >= 0; i--) {
    snakeBody[i].update();
  }
};

const handleSnakeEatingFood = (snake, food) => {
  if (food.x === snake.x && food.y === snake.y) {
    growSnake(food.x, food.y);
    createFood();
    score++;
  }
};

const endGame = () => {
  clearInterval(animateInterval);

  if (score === col * row) {
    document.querySelector(".game-over").textContent = "You Win!";
  }

  scoreDisplayEnd.textContent = score;
  retryBtn.addEventListener("click", () => location.reload());
  endGameContainer.style.display = "flex";
};
