

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

// const lists = [new LinkedList([9,3,2]).head, new LinkedList([5,2,1,-1]).head, new LinkedList([7, 1]).head]

// const sorted = mergeKLists(lists);

// console.log(LinkedList.toString(sorted));


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


class MinBinaryHeap {
  constructor(compareFn) {
    this.size = 0;
    this.pq = ['_']; 
    this.isLeftLessRight = compareFn || ((a, b) => !!a && !!b &&  a < b) ;
  }

  insert(val) {
    this.size += 1;
    this.pq[this.size] = val;
    this.swim(this.size);
  }

  delMin() {
    this.swap(1, this.size);
    const popped = this.pq.pop();
    this.sink(1);
    this.size -= 1;
    return popped;
  }

  pop() {
    if (this.size >= 1) {
      return this.delMin();
    }
  }

  swim(index) {
    let tmp = index;
    while(tmp > 1 && this.isLeftLessRight(this.pq[tmp], this.parent(tmp))) {
      this.swap(parseInt(tmp / 2), tmp);
      tmp = parseInt(tmp / 2)
    }
  }

  sink(index) {
    let tmp = index;
    while(
      this.isLeftLessRight(this.childLeft(tmp), this.pq[tmp])
      || this.isLeftLessRight(this.childRight(tmp), this.pq[tmp])
    ) {
      let childIndex = tmp;
      if (this.childLeft(tmp) && this.childRight(tmp)) {
        childIndex = this.isLeftLessRight(this.childLeft(tmp), this.childRight(tmp)) ? tmp * 2 : tmp * 2 + 1;
      } else if (this.childLeft(tmp)) {
        childIndex = tmp * 2;
      } else if (this.childRight(tmp)) {
        childIndex = tmp * 2 + 1;
      }
      
      this.swap(childIndex, tmp);
      tmp = childIndex;
    }
  }

  swap(a, b) {
    [this.pq[a], this.pq[b]] = [this.pq[b], this.pq[a]];
  }

  childLeft(index) {
    return this.pq[index * 2]
  }

  childRight(index) {
    return this.pq[index * 2 + 1]
  }

  parent(index) {
    return this.pq[parseInt(index / 2)];
  }
}


function mergeKLists2(lists) {
  const linkedListHeap = new MinBinaryHeap((node1, node2) => node1 && node2 && node1.val < node2.val);
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
    if (tempNode && tempNode.next) {
      console.log(tempNode.val)
      linkedListHeap.insert(tempNode.next);
    }
  }
  return head.next;
}
[[-8,-7,-7,-5,1,1,3,4],[-2],[-10,-10,-7,0,1,3],[2]]
const lists2 = [new LinkedList([-8,-7,-7,-5,1,1,3,4]).head, new LinkedList([-2]).head, new LinkedList([-10,-10,-7,0,1,3]).head, new LinkedList([2]).head]

const merged2 = mergeKLists2(lists2);

console.log(LinkedList.toString(merged2));