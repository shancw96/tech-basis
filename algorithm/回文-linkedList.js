const {LinkedList} = require('./utils');
const head = new LinkedList(['a','b','a','b','a'])
const isPalindrome = (head) => {
  // 快慢指针遍历链表
  let fast = head;
  let slow = head;
  let stack = [];
  while (fast && fast.next) {
    stack.push(slow);
    fast = fast.next.next;
    slow = slow.next;
  }
  
  // 栈弹出
  if(fast) slow = slow.next //当fast存在的情况下，为奇数， slow 进入下半段
  while (slow) {
    const last = stack.pop();
    if (slow.val !== last.val) return false;
    slow = slow.next;
  }
  return true;
};

console.log(isPalindrome(head))