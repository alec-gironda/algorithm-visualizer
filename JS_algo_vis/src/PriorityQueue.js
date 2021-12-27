export default class PriorityQueue {
  constructor() {
    this.items = [];
  }

  //order by f score
  enqueue(NodePriorityPair) {
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].f_score > NodePriorityPair.f_score) {
        this.items.splice(i, 0, NodePriorityPair);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(NodePriorityPair);
    }
  }

  isEmpty() {
    // return true if the queue is empty.
    return this.items.length === 0;
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
}
