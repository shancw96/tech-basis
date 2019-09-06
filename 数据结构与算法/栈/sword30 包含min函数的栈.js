/**
 * 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的min函数。
 * 在改栈中调用min，push，及pop的时间复杂度都为O(1)
 */

class myStack {
  constructor() {
    this.stack = []
    this.min_stack = []
  }
  pop() {
    let popped = this.stack.pop()
    popped == this.min_stack[this.min_stack.length-1] ? this.min_stack.pop() : ''
    return popped
  }
  push(num) {
    if(this.min_stack.length == 0) this.min_stack.push(num)
    num < this.min_stack[this.min_stack.length-1] ? this.min_stack.push(num) : ''
    this.stack.push(num)
  }
  min() {
    return this.min_stack.length ? this.min_stack[this.min_stack.length-1]:'stack is empty'
  }
}

let testStack = new myStack()

testStack.push(3)
testStack.push(1)
testStack.push(2)
testStack.pop()
// testStack.pop()
testStack
let ans = testStack.min()

ans