class monotonicQueue {
  constructor() {
    this.queue = [];
  }

  push(item) {
    while(this.peek() <= item) {
      this.queue.pop();
    }
    this.queue.push(item);
  }

  peek() {
    return this.queue[this.queue.length -1];
  }

  pop(num) {
    if (num == this.max()) {
      this.queue.shift();
    }
  }

  max() {
    return this.queue[0];
  }
}

function maxSlidingWindow(nums, size) {

  const queue = new monotonicQueue();
  let ans = [];
  let left = 0;
  let right = size - 1;

  for(let i =left; i<=right; i++) {
    queue.push(nums[i]);
  }
  ans.push(queue.max());
  
  while(right < nums.length) {
    queue.pop(nums[left]);
    left += 1;
    right += 1;
    if (typeof nums[right] == 'number') {
      queue.push(nums[right])
      ans.push(queue.max());
    }
  }

  return ans;
}

console.log(maxSlidingWindow([9, 11], 2));