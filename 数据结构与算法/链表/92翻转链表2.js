
function ListNode(val) {
  this.val = val;
  this.next = null;
}
let head = new ListNode(1)
let move_p = head
move_p.next = new ListNode(2)
move_p = move_p.next
move_p.next = new ListNode(3)
move_p = move_p.next
move_p.next = new ListNode(4)
move_p = move_p.next
move_p.next = new ListNode(5)



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  let reverse_head = head;
  let prev = null
  let count = 1
  while (count<m) {//这里才是重点，将翻转的节点与未翻转的链接在一起，通过prev实现
     prev = reverse_head
     reverse_head = reverse_head.next
     count+=1
  }
  let first = reverse_head
  let target = reverse_head.next
  while (count<n) {
    first.next = target.next;
    target.next = reverse_head
    reverse_head = target
    target = first.next
    count += 1;
  }
  if(!prev) return reverse_head
  prev.next = reverse_head
  return head
};