export default class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  enqueue(NodePriorityPair) {
    var contain = false;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].f_score > NodePriorityPair.f_score) {
        this.items.splice(i, 0, NodePriorityPair);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(NodePriorityPair);
    }
  }

  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length === 0;
  }

  // dequeue method to remove
  // element from the queue
  dequeue() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
}
