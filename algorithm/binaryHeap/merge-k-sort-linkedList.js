

const {LinkedList, Node} = require('../utils')


class BinaryHeap {
  constructor(compareFn) {
    this.pq = ['_'];
    this.size = 0;
    this.leftSmallerRight = compareFn;
  }

  insert(node) {
    this.size += 1;
    this.pq[this.size] = node;
    this.swim(this.size);
  }

  swim(index) {
    let swappingIndex = index;
    while (swappingIndex > 1 && this.leftSmallerRight(this.pq[this.parentIndex(swappingIndex)], this.pq[swappingIndex])) {
      this.swap(this.parentIndex(swappingIndex), swappingIndex);
      swappingIndex = this.parentIndex;
    }
  }

  sink(index) {
    let swappingIndex = index;
    while(
      this.leftSmallerRight(this.pq[swappingIndex], this.pq[this.childLeftIndex(swappingIndex)])
      || this.leftSmallerRight(this.pq[swappingIndex], this.pq[this.childRightIndex(swappingIndex)])
    ) {
      const childIndex = this.leftSmallerRight(this.pq[swappingIndex], this.pq[this.childLeftIndex(swappingIndex)]) ? this.childLeftIndex(swappingIndex) : this.childRightIndex(swappingIndex);
      this.swap(swappingIndex, childIndex);
      swappingIndex = childIndex;
    }
  }

  pop() {
    if (this.size >= 1) {
      this.swap(1, this.size);
      const popped = this.pq.pop();
      this.sink(1);
      this.size -= 1;
      return popped;
    }
  }

  parentIndex(index) {
    return parseInt(index / 2);
  }

  childLeftIndex(index) {
    return index * 2;
  }

  childRightIndex(index) {
    return index * 2 + 1;
  }

  swap(index1, index2) {
    [this.pq[index1], this.pq[index2]] = [this.pq[index2], this.pq[index1]];
  }
}

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

const lists = [new LinkedList([9,3,2]).head, new LinkedList([5,2,1,-1]).head, new LinkedList([7, 1]).head]

const sorted = mergeKLists(lists);

console.log(LinkedList.toString(sorted));


function mergeKLists(lists) {
  const linkedListHeap = new BinaryHeap((node1, node2) => node1 && node2 && node1.val < node2.val);
  let movePointer = new ListNode();
  const head = movePointer;
  for(let head of lists) {
    if (head) {
      linkedListHeap.insert(head);
    }
  }

  while(linkedListHeap.size > 0) {
    let tempNode = linkedListHeap.pop();
    movePointer.next = tempNode;
    movePointer = movePointer.next;
    if (tempNode.next) {
      linkedListHeap.insert(tempNode.next);
    }
  }
  return head.next;
}


