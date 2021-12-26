const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const W_NODE = 35;
//const H_NODE = 35;

export default class Node {
  constructor(x, y, w, h, parentNode) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.parentNode = parentNode;
    this.isStart = false;
    this.isFinish = false;
    this.isWall = false;
    this.f_score = Infinity;
    this.g_score = Infinity;
    this.h_score = Infinity;
    this.color = "#fff";
    this.neighbors = [];
    this.rect = ctx.rect(this.x, this.y, this.w, this.h);
    this.dist = Infinity;
  }
  //setter methods allow changes to attributes of a Node object
  setStart(bool) {
    this.isStart = bool;
  }
  setFinish(bool) {
    this.isFinish = bool;
  }
  setWall(bool) {
    this.isWall = bool;
  }

  setColor(color) {
    this.color = color;
  }
  setDist(int) {
    this.dist = int;
  }
  setNeighbor(neighbor) {
    this.neighbors.push(neighbor);
  }
  set_f_score(int) {
    this.f_score = int;
  }
  set_g_score(int) {
    this.g_score = int;
  }
  set_h_score(int) {
    this.h_score = int;
  }
  setParentNode(node) {
    this.parentNode = node;
  }

  //getter methods allow easy calls to attributes of Node objects
  getDist() {
    return this.dist;
  }
  getNeighbors() {
    return this.neighbors;
  }
  getWall() {
    return this.isWall;
  }
  getFinish() {
    return this.isFinish;
  }
  getStart() {
    return this.isStart;
  }

  //function to draw individual node
  drawNode() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + 10, this.y + 10, this.w - 10, this.h - 10);
  }
  //function to draw animated search node
  drawSearchedNode() {
    let x = this.x + 22.5;
    let y = this.y + 22.5;
    let dx = 0;
    let dy = 0;
    let boundary = this.x + W_NODE;
    this.color = "#0ff";
    ctx.fillStyle = this.color;

    function render() {
      ctx.fillRect(x, y, dx, dy);
      x += 1;
      y += 1;
      dx -= 2;
      dy -= 2;
      if (x > boundary) return;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
  drawSearchedNodeAStar() {
    let x = this.x + 22.5;
    let y = this.y + 22.5;
    let dx = 0;
    let dy = 0;
    let boundary = this.x + W_NODE;
    this.color = "#f73";
    ctx.fillStyle = this.color;

    function render() {
      ctx.fillRect(x, y, dx, dy);
      x += 1;
      y += 1;
      dx -= 2;
      dy -= 2;
      if (x > boundary) return;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
  drawFinishPath() {
    let x = this.x + 22.5;
    let y = this.y + 22.5;
    let dx = 0;
    let dy = 0;
    let boundary = this.x + W_NODE;
    this.color = "#ff0";
    ctx.fillStyle = this.color;

    function render() {
      ctx.fillRect(x, y, dx, dy);
      x++;
      y++;
      dx -= 2;
      dy -= 2;
      if (x > boundary) return;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  drawFinishAnimation() {
    let x = this.x + 10 + "px";
    let y = this.y + 10 + "px";
    document.getElementById("final_node_blink").style.width = "25px";
    document.getElementById("final_node_blink").style.height = "25px";
    document.getElementById("final_node_blink").style.left = x;
    document.getElementById("final_node_blink").style.top = y;
    document.getElementById("final_node_blink").style.animation =
      "finish_blink 1s infinite";
  }
  stopFinishAnimation() {
    document.getElementById("final_node_blink").style.width = "0px";
    document.getElementById("final_node_blink").style.height = "0px";
  }
}
