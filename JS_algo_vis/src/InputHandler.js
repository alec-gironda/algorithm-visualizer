const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = canvas.clientWidth;
const SCREEN_HEIGHT = canvas.clientHeight;
const W_NODE = 35;
const H_NODE = 35;

const GRID_WIDTH = SCREEN_WIDTH / W_NODE;
const GRID_HEIGHT = (SCREEN_HEIGHT - H_NODE) / H_NODE;

//allows user to scroll and still have the grid respond correctly
function getTransformedPoint(x, y) {
  const transform = ctx.getTransform();
  const transformedX = x - transform.e;
  const transformedY = y - transform.f;
  return { x: transformedX, y: transformedY };
}

export default class InputHandler {
  constructor(node, nodes) {
    //get mouse coords
    canvas.addEventListener("mousemove", (event) => {
      const transformedCursorPosition = getTransformedPoint(
        event.offsetX,
        event.offsetY
      );
      this.mouse_x_coord = transformedCursorPosition.x;
      this.mouse_y_coord = transformedCursorPosition.y;
    });
    document
      //reset button
      .getElementById("reset-button")
      .addEventListener("click", (event) => {
        document.getElementById("final_node_blink").style.width = "0px";
        document.getElementById("final_node_blink").style.height = "0px";

        node.setColor("#fff");
        node.setWall(false);
        node.setStart(false);
        node.setFinish(false);
        node.setDist(Infinity);
        node.drawNode();
        node.setParentNode(0);
        node.f_score = Infinity;
        node.g_score = Infinity;
        node.h_score = Infinity;
        if (
          node.x === 0 ||
          node.x === (GRID_WIDTH - 1) * W_NODE ||
          node.y === H_NODE ||
          node.y === Math.ceil(GRID_HEIGHT - 1) * H_NODE
        ) {
          node.setColor("#000");
          node.setWall(true);
          node.drawNode();
        }
      });
    //generate maze randomly
    document.getElementById("generate").addEventListener("click", (event) => {
      let random_node = nodes[Math.floor(Math.random() * nodes.length - 1)];
      if (random_node !== undefined && Math.random() > 0.6) {
        random_node.setColor("#000");
        random_node.setWall(true);
        random_node.drawNode();
      }
    });
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "s": //s pressed for start
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40 &&
            node.x !== 0 &&
            node.x !== (GRID_WIDTH - 1) * W_NODE &&
            node.y !== H_NODE &&
            node.y !== Math.ceil(GRID_HEIGHT - 1) * H_NODE
          ) {
            console.log(node.x);

            console.log(this.mouse_x_coord);
            node.setColor("#0f0");
            node.setStart(true);
            node.drawNode();
          }
          break;

        case "f": //f pressed for finish
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40 &&
            node.x !== 0 &&
            node.x !== (GRID_WIDTH - 1) * W_NODE &&
            node.y !== H_NODE &&
            node.y !== Math.ceil(GRID_HEIGHT - 1) * H_NODE
          ) {
            node.setColor("#f00");
            node.setFinish(true);
            node.drawNode();
          }
          break;
        case "m": //m pressed for mistake
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40 &&
            node.x !== 0 &&
            node.x !== (GRID_WIDTH - 1) * W_NODE &&
            node.y !== H_NODE &&
            node.y !== Math.ceil(GRID_HEIGHT - 1) * H_NODE
          ) {
            node.setColor("#fff");
            node.setWall(false);
            node.setStart(false);
            node.setFinish(false);
            node.drawNode();
          }
          break;
        case "w": //w pressed for wall
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40
          ) {
            node.setColor("#000");
            node.setWall(true);
            node.drawNode();
          }
          break;
        default:
      }
    });

    //same as keypresses except that works with dropdown and mouse click
    document.addEventListener("mousedown", (event) => {
      var select = document.getElementById("input-dropdown");
      var value = select.options[select.selectedIndex].value;

      switch (value) {
        case "start":
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40 &&
            node.x !== 0 &&
            node.x !== (GRID_WIDTH - 1) * W_NODE &&
            node.y !== H_NODE &&
            node.y !== Math.ceil(GRID_HEIGHT - 1) * H_NODE
          ) {
            node.setColor("#0f0");
            node.setStart(true);
            node.drawNode();
          }

          break;

        case "finish":
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40 &&
            node.x !== 0 &&
            node.x !== (GRID_WIDTH - 1) * W_NODE &&
            node.y !== H_NODE &&
            node.y !== Math.ceil(GRID_HEIGHT - 1) * H_NODE
          ) {
            node.setColor("#f00");
            node.setFinish(true);
            node.drawNode();
          }

          break;
        case "erase":
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40 &&
            node.x !== 0 &&
            node.x !== (GRID_WIDTH - 1) * W_NODE &&
            node.y !== H_NODE &&
            node.y !== Math.ceil(GRID_HEIGHT - 1) * H_NODE
          ) {
            node.setColor("#fff");
            node.setWall(false);
            node.setStart(false);
            node.setFinish(false);
            node.drawNode();
          }
          break;
        case "walls":
          if (
            node.x <= this.mouse_x_coord - 8 &&
            this.mouse_x_coord <= node.x + 40 &&
            node.y <= this.mouse_y_coord - 8 &&
            this.mouse_y_coord <= node.y + 40
          ) {
            node.setColor("#000");
            node.setWall(true);
            node.drawNode();
          }
          break;
        default:
      }
    });
  }
}
