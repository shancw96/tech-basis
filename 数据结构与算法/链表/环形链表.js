/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if( !head||!head.next) return false
  let slow = head
  let fast = head.next;
  while(slow !== fast){
      if(!fast.next || !fast.next.next) return false
      fast = fast.next.next;
      slow = slow.next
  }
  return true
};