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
