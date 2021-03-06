import NodePriorityPair from "./NodePriorityPair.js";
import PriorityQueue from "./PriorityQueue.js";

//this class will handle the backend of the algorithms
export default class Algorithms {
  constructor(node, nodes) {
    //when user clicks, see what is selected in the algo dropdown
    document.getElementById("visualize").addEventListener("click", (event) => {
      switch (document.querySelector("select").value) {
        case "bfs":
          //fn to delay algo
          function delay_bfs(n) {
            return new Promise(function (resolve) {
              setTimeout(resolve, n);
            });
          }
          async function bfs() {
            let queue = [];
            let finish = node;
            let start = node;
            let searchNode = node;
            let searchNodes = [];
            //find start and finish
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].getFinish() === true) {
                finish = nodes[i];
              } else if (nodes[i].getStart() === true) {
                start = nodes[i];
                //set start dist to 0
                start.setDist(0);
                //push start into queue
                queue.push(start);
              }
            }
            let original_finish = finish;

            while (queue.length !== 0) {
              searchNode = queue.shift();
              if (searchNode === finish) {
                for (
                  //animation fix for end of search
                  let i = searchNodes.length - 6;
                  i < searchNodes.length;
                  i++
                ) {
                  if (searchNodes[i] !== undefined) {
                
                    searchNodes[i].drawSearchedNode();

                    await delay_bfs(50);
                  }
                }
                break;
              }


              for (let i = 0; i < searchNode.getNeighbors().length; i++) {
                //skip walls
                if (searchNode.getNeighbors()[i].getWall()) {
                  continue;
                } else if (
                  searchNode.getNeighbors()[i].getDist() === Infinity
                ) {
                  const tmp = searchNode.getNeighbors()[i];

                  tmp.drawSearchedNode();

                  await delay_bfs(50);

                  tmp.setColor("#00f");
                  tmp.drawNode();

                  searchNodes.push(tmp);
                  searchNode
                    .getNeighbors()
                    [i].setDist(searchNode.getDist() + 1);
                  queue.push(searchNode.getNeighbors()[i]);
                }
              }
            }
            //animation fix for end if finish not found
            if (searchNode !== finish) {
              let i = searchNodes.length - 6;
              while (i === undefined) {
                i++;
              }

              for (i; i < searchNodes.length; i++) {
                if (searchNodes[i] !== undefined) {
                  searchNodes[i].drawSearchedNode();
                  await delay_bfs(50);
                }
              }
              await delay_bfs(500);
              alert("couldn't reach finish!");
              return;
            }

            original_finish.drawFinishAnimation();
            await delay_bfs(300);
            let dist = 0;
            let smallestDist = Infinity;
            let finishPathArr = [finish];

            //draw finish path
            while (finish !== start) {
              dist++;
              for (let i = 0; i < finish.getNeighbors().length; i++) {
                if (finish.getNeighbors()[i].getDist() < smallestDist) {
                  smallestDist = finish.getNeighbors()[i].getDist();
                }
                if (i === finish.getNeighbors().length - 1) {
                  for (let j = 0; j < finish.getNeighbors().length; j++) {
                    if (finish.getNeighbors()[j].getDist() === smallestDist) {
                      finish = finish.getNeighbors()[j];

                      finishPathArr.push(finish);
                    }
                  }
                }
              }
            }

            await delay_bfs(300);
            for (let i = finishPathArr.length - 2; i > -1; i--) {
              finishPathArr[i].setColor("#fff");
              finishPathArr[i].drawNode();
              finishPathArr[i].drawFinishPath();
              await delay_bfs(75);
            }
            original_finish.stopFinishAnimation();
            await delay_bfs(500);
            alert("distance from start: " + dist);
            return;
          }
          bfs();

          break;
        case "dfs":
          //essentially the same code as bfs except w/ a stack instead of a queue
          function delay_dfs(n) {
            return new Promise(function (resolve) {
              setTimeout(resolve, n);
            });
          }
          async function dfs() {
            let stack = [];
            let finish = node;
            let start = node;
            let searchNode = node;
            let searchNodes = [];
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].getFinish() === true) {
                finish = nodes[i];
              } else if (nodes[i].getStart() === true) {
                start = nodes[i];
                start.setDist(0);
                stack.push(start);
              }
            }
            let original_finish = finish;

            while (stack.length !== 0) {
              searchNode = stack.pop();
              if (searchNode === finish) {
                for (
                  let i = searchNodes.length - 6;
                  i < searchNodes.length;
                  i++
                ) {
                  if (searchNodes[i] !== undefined) {
                    searchNodes[i].drawSearchedNode();

                    await delay_dfs(50);
                  }
                }
                break;
              }

              for (let i = 0; i < searchNode.getNeighbors().length; i++) {
                if (searchNode.getNeighbors()[i].getWall()) {
                  continue;
                } else if (
                  searchNode.getNeighbors()[i].getDist() === Infinity
                ) {
                  const tmp = searchNode.getNeighbors()[i];

                  tmp.drawSearchedNode();

                  await delay_dfs(50);

                  tmp.setColor("#00f");
                  tmp.drawNode();

                  searchNodes.push(tmp);
                  searchNode
                    .getNeighbors()
                    [i].setDist(searchNode.getDist() + 1);
                  stack.push(searchNode.getNeighbors()[i]);
                }
              }
            }

            if (searchNode !== finish) {
              let i = searchNodes.length - 6;
              while (i === undefined) {
                i++;
              }

              for (i; i < searchNodes.length; i++) {
                if (searchNodes[i] !== undefined) {
                  searchNodes[i].drawSearchedNode();
                  await delay_dfs(50);
                }
              }
              await delay_dfs(500);
              alert("couldn't reach finish!");
              return;
            }

            original_finish.drawFinishAnimation();
            await delay_dfs(300);
            let dist = 0;
            let smallestDist = Infinity;
            let finishPathArr = [finish];

            while (finish !== start) {
              dist++;
              for (let i = 0; i < finish.getNeighbors().length; i++) {
                if (finish.getNeighbors()[i].getDist() < smallestDist) {
                  smallestDist = finish.getNeighbors()[i].getDist();
                }
                if (i === finish.getNeighbors().length - 1) {
                  for (let j = 0; j < finish.getNeighbors().length; j++) {
                    if (finish.getNeighbors()[j].getDist() === smallestDist) {
                      finish = finish.getNeighbors()[j];

                      finishPathArr.push(finish);
                    }
                  }
                }
              }
            }

            await delay_dfs(300);
            for (let i = finishPathArr.length - 2; i > -1; i--) {
              finishPathArr[i].setColor("#fff");
              finishPathArr[i].drawNode();
              finishPathArr[i].drawFinishPath();
              await delay_dfs(75);
            }
            original_finish.stopFinishAnimation();

            await delay_dfs(500);
            alert("distance from start: " + dist);
            return;
          }
          dfs();

          break;
        case "a_star":
          //manhattan distance heuristic
          function heuristic(start, finish) {
            return Math.abs(start.x - finish.x) + Math.abs(start.y - finish.y);
          }
          
          async function a_star() {
            //fn to delay
            function delay_a_star(n) {
              return new Promise(function (resolve) {
                setTimeout(resolve, n);
              });
            }
            //use priority queues for openList and closedList to find lowest f_score easier
            let openList = new PriorityQueue();
            let closedList = new PriorityQueue();
            let finish = node;

            //find start and finish and push start into openList
            let start = node;
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].getStart() === true) {
                start = nodes[i];
                start.set_f_score(0);
                let startPriorityPair = new NodePriorityPair(
                  start,
                  start.f_score
                );
                openList.enqueue(startPriorityPair);
              }
              if (nodes[i].getFinish() === true) {
                finish = nodes[i];
              }
            }
            while (!openList.isEmpty()) {
              let smallest_f_node = openList.dequeue().node;
              if (smallest_f_node !== start) {
                smallest_f_node.drawSearchedNode();

                await delay_a_star(75);
                smallest_f_node.setColor("#00f");

                smallest_f_node.drawNode();
              }
              for (let k = 0; k < smallest_f_node.getNeighbors().length; k++) {
                let currNeighbor = smallest_f_node.getNeighbors()[k];

                if (currNeighbor === finish) {
                  finish.setColor("#00f");
                  finish.drawNode();
                  finish.drawSearchedNode();
                  finish.drawFinishAnimation();
                  currNeighbor.setParentNode(smallest_f_node);
                  let fin_path_list = [];
                  //create finish path list
                  while (currNeighbor !== start) {
                    fin_path_list.push(currNeighbor);
                    currNeighbor = currNeighbor.parentNode;
                  }
                  //animation fix for end
                  for (
                    let i = closedList.items.length - 2;
                    i < closedList.items.length;
                    i++
                  ) {
                    closedList.items[i].node.drawSearchedNode();
                  }

                  await delay_a_star(300);
                  //draw finish path
                  for (let i = fin_path_list.length - 1; i > -1; i--) {
                    fin_path_list[i].setColor("#fff");
                    fin_path_list[i].drawNode();
                    fin_path_list[i].drawFinishPath();
                    await delay_a_star(75);
                    fin_path_list[i].drawNode();
                  }
                  await delay_a_star(500);
                  alert("distance from start: " + fin_path_list.length);
                  finish.stopFinishAnimation();
                  return;
                }
                if (currNeighbor.getWall() === true) {
                  continue;
                }
                if (smallest_f_node === start) {
                  smallest_f_node.g_score = 0;
                }
                //set f,g,h score of neighbor
                let curr_g_score = smallest_f_node.g_score + 1;
                currNeighbor.set_h_score(heuristic(currNeighbor, finish));
                let curr_f_score = curr_g_score + currNeighbor.h_score;
                currNeighbor.set_f_score(curr_f_score);
                if (!(currNeighbor.g_score < curr_g_score)) {
                  currNeighbor.setParentNode(smallest_f_node);
                  currNeighbor.set_g_score(curr_g_score);
                }

                let skip = false;
                let inOpenList = false;
                let inClosedList = false;
                for (let i = 0; i < openList.items.length; i++) {
                  if (currNeighbor === openList.items[i].node) {
                    inOpenList = true;
                  }
                  if (
                    currNeighbor === openList.items[i].node &&
                    openList.items[i].g_score < currNeighbor.g_score
                  ) {
                    skip = true;
                  }
                }
                if (skip === true) {
                  continue;
                }
                for (let i = 0; i < closedList.items.length; i++) {
                  if (currNeighbor === closedList.items[i].node) {
                    inClosedList = true;
                  }
                  if (
                    currNeighbor === closedList.items[i].node &&
                    closedList.items[i].g_score < currNeighbor.g_score
                  ) {
                    closedList.items.splice(i, 1);
                    let NeighborNodePair = new NodePriorityPair(
                      currNeighbor,
                      currNeighbor.f_score
                    );
                    openList.enqueue(NeighborNodePair);

                    skip = true;
                  }
                }
                //if not in openList or closedList add to openList
                if (!inOpenList && !inClosedList) {
                  let NeighborNodePair = new NodePriorityPair(
                    currNeighbor,
                    currNeighbor.f_score
                  );
                  openList.enqueue(NeighborNodePair);
                }

                if (skip === true) {
                  continue;
                }
              }
              let currNodePair = new NodePriorityPair(
                smallest_f_node,
                smallest_f_node.f_score
              );
              closedList.enqueue(currNodePair);
            }
            
            //fix animation for end if couldn't reach finish
            for (
              let i = closedList.items.length - 2;
              i < closedList.items.length;
              i++
            ) {
              closedList.items[i].node.drawSearchedNode();
            }
            await delay_a_star(500);
            alert("couldn't reach finish!");
          }
          a_star();
          break;
        default:
      }
    });
  }
}
