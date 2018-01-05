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
food.img = new Image(size,size);
food.img.src = "./food.png";
console.log(food.img);
spawnFood();

window.addEventListener("keydown",function(e) {
  let key = e.which;
  let actions = {
    37 : "LEFT",
    38 : "UP",
    39 : "RIGHT",
    40 : "DOWN"
  };
  if (key in actions) {
    snake.turn(actions[key]);
  }
});

async function start() {
  while(gameOn) {
    render();
    await sleep(4/snake.speed*1000);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function spawnFood() {
  food.x = Math.floor(Math.random() * xs);
  food.y = Math.floor(Math.random() * ys);
}

function drawFood() {
  let point = pointToAxis(food);
  ctx.drawImage(food.img,point.x,point.y,size,size)
}


function drawSnake() {
  ctx.fillStyle = config.snakeColor;
  for (let point of snake.points) {
    let coo = pointToAxis(point);
    ctx.fillRect(coo.x,coo.y,config.size,config.size);
  }
}

function render() {
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0,0,config.width,config.height);
  drawSnake();
  drawFood();
  snake.move();
}

function pointToAxis(point) {
  return {x: point.x*config.size,y: point.y*config.size}
}

module.exports = start;
