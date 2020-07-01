const {LinkedList} = require('./utils')
const linkedList = new LinkedList([0])

linkedList.add(1)
let curNode = linkedList.add(2)
linkedList.add(3)
let curNode2 = linkedList.add(4)
// 创造环链表
curNode2.next = curNode
console.log(circle_entry(linkedList.head))
// debugger;
function isCircle_point(head) {
  let slow = head;
  let fast = head.next;
  while(fast && fast.next) {
    if(slow === fast) return true
    slow = slow.next;
    fast = fast.next.next;
  }
  return false;
}

function isCircle_set(head) {
  let dir = new Set();
  let move_head = head;
  while(move_head) {
    let prev_len = dir.size;
    dir.add(move_head);
    if(dir.size === prev_len) return true;
    move_head = move_head.next;
  }
  return false
}

// a = c - b
function circle_entry(head) {
  // 返回h相遇点
  function isCircle(head) {
    let slow = head;
    let fast = head.next;
    while(slow !== fast) {
      if(!fast || !fast.next){
        console.log(fast)
        return null;
      }
      slow = slow.next;
      fast = fast.next.next;
    }
    return fast;
  }
  // 返回环入口
  function findCircle(start, meet) {
    return !!meet
      ? start === meet
        ? start
        : findCircle(start.next, meet.next)
      : -1
  }
  return findCircle(head, isCircle(head))
}