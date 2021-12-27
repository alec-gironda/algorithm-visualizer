const canvas = document.getElementById("gameScreen");

const ctx = canvas.getContext("2d");

export default class GridLine {
  //gridlines for grid
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rect = ctx.rect(this.x, this.y, this.w, this.h);
  }
  //function to draw individual gridline
  drawGridLine() {
    ctx.fillStyle = "#000";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
