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

module.exports = start;

function start() {
  setInterval(render,500);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  snake.move();
}

function pointToAxis(point) {
  return {x: point.x*config.size,y: point.y*config.size}
}
