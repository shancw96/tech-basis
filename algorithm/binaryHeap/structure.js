class MaxBinaryHeap {
  constructor(initArray, compareFn) {
    this.pq = ['__BLANK__'];
    this.size = 0;
    this.compareFn = compareFn || ((a, b) => a < b);
  }

  // 上浮
  swim(index) {
    let tempIndex = index;
    while(tempIndex > 1 && this.less(parseInt(tempIndex / 2), tempIndex)) {
      this.exchange(parseInt(tempIndex / 2), tempIndex);
      tempIndex = parseInt(tempIndex / 2);
    }
  }
  // 下潜
  sink(index) {
    let tempIndex = index;
    while(this.pq[tempIndex] < Math.max(this.childLeft(tempIndex), this.childRight(tempIndex))) {
      const biggerChildIndex = this.childLeft(tempIndex) < this.childRight(tempIndex) ? tempIndex * 2 + 1 : tempIndex * 2;
        this.exchange(tempIndex, biggerChildIndex)
        tempIndex = biggerChildIndex;
    }
  }
  // 交换
  exchange(index1, index2) {
    [this.pq[index1], this.pq[index2]] = [this.pq[index2], this.pq[index1]]
    return index2;
  }
  // 返回最大值
  get max() {
    return this.pq[1];
  }
  // 子节点 left
  childLeft(index) {
    return this.pq[index * 2];
  }
  childRight(index) {
    return this.pq[index * 2 + 1];
  }
  // 父节点
  parent(index) {
    return this.pq[parseInt(index / 2)];
  }
  
  // 插入新数据
  insert(num) {
    this.size += 1;
    this.pq[this.size] = num;
    this.swim(this.size);
  }
  deleteMax() {
    this.delete(1);
    return this.max;
  }
  delete(index) {
    this.exchange(index, this.size);
    this.pq.splice(this.size);
    this.size -= 1;
    this.sink(index);
  }
  // 大小比较，Index a对应的值 是否比 Index b 对应的值小
  less(a, b) {
    return this.compareFn(this.pq[a], this.pq[b]);
  }
}

const heap = new MaxBinaryHeap();
heap.insert(1);
heap.insert(5);
heap.insert(3);
heap.insert(2);
heap.insert(20);
heap.insert(12);

heap.delete(1);

console.log(heap.max);