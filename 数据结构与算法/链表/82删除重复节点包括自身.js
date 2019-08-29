
function ListNode(val) {
  this.val = val;
  this.next = null;
}
let head = new ListNode(1)
let move_p = head
move_p.next = new ListNode(1)
move_p = move_p.next
move_p.next = new ListNode(2)
move_p = move_p.next
move_p.next = new ListNode(2)
move_p = move_p.next
move_p.next = new ListNode(4)

var deleteDuplicates = function(head) {
  let prev = new ListNode(null)
  prev.next = head;
  let target = head;
  while(target.next && target.val == target.next.val){
    target = moveToLast(target)
    head = target.next
    if(!head) return head
    target = head
  
  }
  while(target && target.next){
    if(target.val == target.next.val){
      target = moveToLast(target)
      prev.next = target.next;
      target = prev.next
    }else{
      prev = prev.next;
      target = target.next
    }
  }
  return head
};
function moveToLast(target){
  // if(!target.next) return target
  while(target.next && target.val == target.next.val ){
      target = target.next
  }
  return target
}

let res = deleteDuplicates(head)
res