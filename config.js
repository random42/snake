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
