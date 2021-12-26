import Node from "./Node";
import GridLine from "./GridLine";
import InputHandler from "./InputHandler";
import Algorithms from "./Algorithms";

//define screen
const canvas = document.getElementById("gameScreen");

const SCREEN_WIDTH = canvas.clientWidth;
const SCREEN_HEIGHT = canvas.clientHeight;
//init node width and height
const W_NODE = 35;
const H_NODE = 35;

//init node placements
const GRID_WIDTH = SCREEN_WIDTH / W_NODE;
const GRID_HEIGHT = (SCREEN_HEIGHT - H_NODE) / H_NODE;

//init list of nodes
let nodes = [];
//init x and y coords
let x = 0;
let y = H_NODE;

//init nodes and add to nodes list
for (let i = 0; i < GRID_WIDTH; i++) {
  x = i * W_NODE;
  for (let j = 1; j < GRID_HEIGHT; j++) {
    y = j * H_NODE;
    let node = new Node(x, y, W_NODE, H_NODE);
    nodes.push(node);
  }
}

//init wall nodes
for (let i = 0; i < nodes.length; i++) {
  if (
    nodes[i].x === 0 ||
    nodes[i].x === (GRID_WIDTH - 1) * W_NODE ||
    nodes[i].y === H_NODE ||
    nodes[i].y === Math.ceil(GRID_HEIGHT - 1) * H_NODE
  ) {
    nodes[i].setColor("#000");
    nodes[i].setWall(true);
    nodes[i].drawNode();
  }
}

//set neighbors
for (let i = 0; i < nodes.length; i++) {
  for (let j = 0; j < nodes.length; j++) {
    if (
      (nodes[j].x === nodes[i].x + W_NODE && nodes[j].y === nodes[i].y) ||
      (nodes[j].x === nodes[i].x - W_NODE && nodes[j].y === nodes[i].y) ||
      (nodes[j].x === nodes[i].x && nodes[j].y === nodes[i].y - H_NODE) ||
      (nodes[j].x === nodes[i].x && nodes[j].y === nodes[i].y + H_NODE)
    ) {
      nodes[i].setNeighbor(nodes[j]);
    }
  }
}
//init list of gridlines
let gridLines = [];

//init gridLines

//vertical gridlines
for (let i = 1; i < GRID_WIDTH; i++) {
  x = i * W_NODE;
  let gridLine = new GridLine(
    x,
    H_NODE + 10,
    10,
    SCREEN_HEIGHT - 10 - 2 * H_NODE
  );
  gridLines.push(gridLine);
}
//horizontal gridlines
for (let i = 2; i < GRID_HEIGHT; i++) {
  y = i * H_NODE;
  let gridLine = new GridLine(10, y, SCREEN_WIDTH, 10);
  gridLines.push(gridLine);
}

//draw nodes in grid
for (let i = 0; i < nodes.length; i++) {
  nodes[i].drawNode();
}

//function to draw all gridlines
function drawGridLines() {
  for (let i = 0; i < gridLines.length; i++) {
    gridLines[i].drawGridLine();
  }
}

drawGridLines();

for (let i = 0; i < nodes.length; i++) {
  new InputHandler(nodes[i], nodes);
}

new Algorithms(nodes[0], nodes);
