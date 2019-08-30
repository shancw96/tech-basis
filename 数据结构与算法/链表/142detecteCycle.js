/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if(hasCycle(head)==-1) return -1
    let meetNode = hasCycle(head)
    let start = head
    let countPos = 1
    while(start !== meetNode){
      countPos += 1
      start = start.next;
      meetNode = meetNode.next
    }
    return countPos
};
var hasCycle = function(head){
  if(!head || !head.next) return -1
  let slow = head;
  let fast = head.next
  while(slow !== fast){
    if(!fast.next || !fast.next.next){
      return -1
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow
}