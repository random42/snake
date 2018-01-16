(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
food.img.src = "./food.png";
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

},{"./config":2,"./snake":4}],2:[function(require,module,exports){
"use strict"

module.exports = {
  height : 500,
  width : 500,
  size : 20,
  setAxis() {
    this.xs = this.width/this.size;
    this.ys = this.height/this.size;
  },
  backgroundColor : "#000099",
  snakeColor : "#FF8000"
};

},{}],3:[function(require,module,exports){
"use strict"

const config = require('./config');
config.setAxis();
const play = require('./canvas');
play();

},{"./canvas":1,"./config":2}],4:[function(require,module,exports){
const UP = [0,-1];
const DOWN = [0,1];
const RIGHT = [1,0];
const LEFT = [-1,0];
const config = require('./config');
const xs = config.xs;
const ys = config.ys;

class Snake {
  constructor() {
    this.points = [];
    for (let i = 0; i < 3;i++) {
      this.points.push({
        x: Math.floor(xs/2)+2-i,
        y: Math.floor(ys/2)
      });
    }
    this.direction = RIGHT;
    this.speed = 15;
    this.growCounter = -1;
  }

  move() {
    if (this.growCounter == 0) {
      this.points.push({});
      this.growCounter = -1;
    } else if (this.growCounter > 0) {
      this.growCounter--;
    }
    for (let i = this.points.length-1; i >= 1;i--) {
      this.points[i] = this.points[i-1];
    }
    let x = this.points[0].x+this.direction[0];
    let y = this.points[0].y+this.direction[1];
    if (x === xs) {
      x = 0;
    } else if (x < 0) {
      x = xs-1;
    }
    if (y === ys) {
      y = 0;
    } else if (y < 0) {
      y = ys-1;
    }
    this.points[0] = {x: x, y: y};
    for (let i = 1;i < this.points.length;i++) {
      if (this.points[0].x == this.points[i].x && this.points[0].y == this.points[i].y) {
        this.over = true;
      }
    }
  }

  turn(str) {
    switch(str) {
      case "UP": this.direction !== DOWN ? this.direction = UP :0; break;
      case "DOWN": this.direction !== UP ? this.direction = DOWN :0; break;
      case "RIGHT": this.direction !== LEFT ? this.direction = RIGHT:0; break;
      case "LEFT": this.direction !== RIGHT ? this.direction = LEFT:0; break;
      default: throw "Invalid direction"; break;
    }
  }

  eat() {
    this.growCounter = this.points.length-1;
    this.speed++;
  }
}

module.exports = Snake;

},{"./config":2}]},{},[3]);
