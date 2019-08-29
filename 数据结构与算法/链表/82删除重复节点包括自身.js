var deleteDuplicates = function(head) {
  let dummy = new ListNode(null)
  //解决不修改head会报错的问题
  dummy.next = head;
  let fast = dummy.next;
  let slow = dummy
  //
  while(fast && fast.next){
    if(fast.val == fast.next.val){
      fast = moveToLast(fast)
      slow.next = fast.next;
    }else{
      slow = slow.next
    }
    fast = fast.next
  }
  return dummy.next
};
function moveToLast(fast){
  // if(!fast.next) return fast
  while(fast.next && fast.val == fast.next.val ){
      fast = fast.next
  }
  return fast
}