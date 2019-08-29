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

function printReverse_changeList(head){
  // console.log(head)
  let prev = head;
  let target = head.next;
  while(target){
    prev.next = target.next;
    target.next = head;
    head = target;
    target = prev.next
  }
  while(head){
    console.log(head.val)
    head = head.next
  }
}

head

function printReverse_stack(head,stack=[]){
  let walk = head
  while(walk){
    stack.push(walk.val)
    walk = walk.next
  }
  while(stack.length){
    console.log(stack.pop())
  }
}
printReverse_stack(head)