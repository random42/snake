const UP = [0,-1];
const DOWN = [0,1];
const RIGHT = [1,0];
const LEFT = [-1,0];
const config = require('./config');
const xs = config.xs;
const ys = config.ys;
const assert = require('assert');

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
    this.speed = 1;
    this.length = 3;
  }

  move() {
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
  }
}

module.exports = Snake;
