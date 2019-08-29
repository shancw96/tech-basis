
let head = new ListNode(1)
let move_p = head
move_p.next = new ListNode(2)
move_p = move_p.next
move_p.next = new ListNode(3)
move_p = move_p.next
move_p.next = new ListNode(4)
move_p = move_p.next
move_p.next = new ListNode(5)

var reverseList = function (head) {
  if (!head) return head
  let target = head.next
  let first = head
  while (target) {
    first.next = target.next
    target.next = head
    head = target
    target = first.next
  }
  return head
};

var reverseList_R = function(head){
  if(!head) return head;
  return recursion(head,head,head.next)
}
function recursion(head,first,target){
  if(!head) return head;
  first.next = target.next
  target.next = head
  return recursion(target,first,first.next)
}