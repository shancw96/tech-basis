
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


var deleteDuplicates = function(head) {
  // if(!head) return head
  let walk = head
  while(walk && walk.next){
    //删除操作和进入下一步操作是不一样的 一个是操作内容walk = walk.next 还有一个是操作指针walk.next = walk.next.next
    walk.val == walk.next.val? walk.next = walk.next.next: walk = walk.next
  }
  
  return head
  
};

deleteDuplicates(head)