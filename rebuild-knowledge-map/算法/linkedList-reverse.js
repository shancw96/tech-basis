/**
 * 关联 leetcode:[206](https://leetcode-cn.com/problems/reverse-linked-list/) [92](https://leetcode-cn.com/problems/reverse-linked-list-ii/)
 */
const {LinkedList} = require('./utils')

const linkedList = new LinkedList([1,2,3,4,5,6,7])

const head = reverseList_recursion(linkedList.head)

function reverseList_iterate_in_place(head) {
  let prev = null;
  let cur = head
  while(cur){
    next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev
}; 
function Node(val) {
  return {
    val,
    next:null
  }
}
function reverseList_iterate_copy(head) {
  let newHead = null
  while(head) {
    // 创建新节点
    let newNode = new Node(head.val)
    // 在已存在的head 之前插入
    newNode.next = newHead
    // 移动head
    newHead = newNode;
    // 原版head 向后移动
    head = head.next;
    console.log(newHead)
  }
  return newHead

}

function reverseList_recursion(head, newHead = null) {
  if(!head) return newHead
  const curNode = new Node(head.val);
  curNode.next = newHead;
  return reverseList_recursion(head.next, curNode)
}

function log(head) {
  while(head) {
    console.log(head.val)
    head = head.next;
  } 
}