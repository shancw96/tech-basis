/**
 * Definition for singly-linked list.

 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 function ListNode(val) {
       this.val = val;
       this.next = null;
   }
var removeNthFromEnd = function(head, n) {
  let fast = head
  let slow = head
  let pre = null
  while(n>0){
      fast = fast.next;
      n -= 1
  }
  while(fast){
      pre = slow//设置一个前置节点的方法1
      fast = fast.next
      slow = slow.next
  }
  if(pre){
      pre.next = pre.next.next
      return head
  }else{
      return head.next
  }
};
//方法2:直接创建一个新的空头节点
/** 
Dummy node 是链表问题中一个重要的技巧，中文翻译叫“哑节点”或者“假人头结点”。
Dummy node 是一个虚拟节点，也可以认为是标杆节点。Dummy node 就是在链表表头 head 前加一个节点指向 head，即 dummy -> head。
Dummy node 的使用多针对单链表没有前向指针的问题，保证链表的 head 不会在删除操作中丢失。
除此之外，还有一种用法比较少见，就是使用 dummy node 来进行head的删除操作，
比如 82，一般的方法current = current.next 是无法删除 head 元素的，所以这个时候如果有一个dummy node在head的前面。
所以，当链表的 head 有可能变化（被修改或者被删除）时，使用 dummy node 可以很好的简化代码，最终返回 dummy.next 即新的链表。
*/
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(null)
  dummy.next = head
  fast = dummy.next
  slow = dummy
  while(n>0){
      fast = fast.next;
      n -= 1
  }
  while(fast){
      fast = fast.next
      slow = slow.next
  }
  slow.next = slow.next.next
  return dummy.next
};