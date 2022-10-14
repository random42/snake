"use strict"

const Snake = require('./snake');
const config = require('./config');

let canvas = document.getElementById('canvas');
const height = config.height;
const width = config.width;
const size = config.size;
canvas.height = height;
canvas.width = width;
const xs = config.xs;
const ys = config.ys;
let snake = new Snake();
let ctx = canvas.getContext("2d");
let gameOn = true;
let food = {};
let direction = "RIGHT";
let score = 0;
food.img = new Image();
food.img.src = "./assets/food.png";
spawnFood();

window.addEventListener("keydown",function(e) {
  let key = e.which;
  let arrows = {
    37 : "LEFT",
    38 : "UP",
    39 : "RIGHT",
    40 : "DOWN"
  };
  if (key in arrows) {
    direction = arrows[key];
  } else if (key == 32 && !snake.over) {
    gameOn = !gameOn;
    if (!gameOn) {
      drawCenterText('Game paused');
    } else {
      play();
    }
  } else if (key == 13) {
    newGame();
    if (!gameOn) {
      gameOn = true;
      play();
    }
  }
});


async function play() {
  while (gameOn) {
    render();
    await sleep(3/snake.speed*1000);
  }
}

function newGame() {
  snake = new Snake();
  score = 0;
  direction = "RIGHT";
  spawnFood();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function spawnFood() {
  food.x = Math.floor(Math.random() * xs);
  food.y = Math.floor(Math.random() * ys);
}

function drawCenterText(text) {
  ctx.fillStyle = 'grey';
  let x = width/4;
  let xl = width/2;
  let y = height/3;
  let yl = (height/2-y)*2;
  ctx.fillRect(x,y,xl,yl);
  ctx.fillStyle = 'white';
  ctx.font = '25px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text,width/2,height/2);
}

function drawFood() {
  let point = pointToAxis(food);
  ctx.drawImage(food.img,point.x,point.y,size,size);
}

function drawSnake() {
  ctx.fillStyle = config.snakeColor;
  for (let point of snake.points) {
    let coo = pointToAxis(point);
    ctx.fillRect(coo.x,coo.y,config.size-1,config.size-1);
  }
}

function drawScore() {
  let size = Math.floor(height/10);
  ctx.fillStyle = 'yellow';
  ctx.font = "20px Times New Roman";
  ctx.textAlign = "end";
  ctx.fillText("Score: "+score,width-5,20);
}


function render() {
  if (snake.over) {
    gameOn = false;
    drawCenterText('Game over!');
    return;
  }
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0,0,config.width,config.height);
  if (food.x == snake.points[0].x && food.y == snake.points[0].y) {
    spawnFood();
    snake.eat();
    score++;
  }
  drawFood();
  drawSnake();
  drawScore();
  snake.turn(direction);
  snake.move();
}

function pointToAxis(point) {
  return {x: point.x*config.size,y: point.y*config.size}
}

module.exports = play;
