/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let rankNum = 0;
  let result = new ListNode(0);
  let res_head = result //定义指向链表顶部的head，留返回
  
  while(l1 !==null || l2 !== null){
      let x = l1?l1.val:0
      let y = l2?l2.val:0
      
      result.next = new ListNode((x + y+rankNum)%10);
      rankNum = parseInt((x + y+rankNum)/10);//取整
      
      result = result.next
      l1?l1 = l1.next:''
      l2?l2 = l2.next:''
  }
  rankNum ? result.next = new ListNode(rankNum) : ''
  return res_head.next
};