/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
let head = new ListNode(1)
let move_p = head
move_p.next = new ListNode(2)
move_p = move_p.next
move_p.next = new ListNode(2)
move_p = move_p.next
move_p.next = new ListNode(4)
move_p = move_p.next
move_p.next = new ListNode(5)

let head2 = new ListNode(1)
let move_p2 = head2
move_p2.next = new ListNode(4)
move_p2 = move_p2.next
move_p2.next = new ListNode(5)
move_p2 = move_p2.next
move_p2.next = new ListNode(9)
move_p2 = move_p2.next
move_p2.next = new ListNode(12)

var mergeTwoLists = function(l1, l2) {
      let stackList = new ListNode(null)
      while(l1 && l2){
        let newNode = new ListNode(null)
        if(l1.val > l2.val){
          newNode.val = l2.val
          l2 = l2.next
        }else{
          newNode.val = l1.val
          l1 = l1.next
        }
        stackList.next = newNode
        stackList = stackList.next
      }
      if(l1){
        stackList.next = l1
      }
      if(l2){
        stackList.next = l2
      }
      return stackList
}

mergeTwoLists(head,head2)