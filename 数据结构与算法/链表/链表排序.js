let ListNode = require('./sourceCode')
let myList = new ListNode([1,2,3,4,5])

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if(head ==null || head.next == null) return head;
  let slow = head;
  let fast = head.next;
  //1.快慢指针进行二分
  while(fast && fast.next){
      slow = slow.next;
      fast = fast.next.next
  }
  let Rtmp = slow.next
  
  slow.next = null
  let left = sortList(head)
  let right = sortList(Rtmp)
  //2.sort排序
 let result = merge(left,right)
 return result
  
};

function merge(left,right){
  let copy = new ListNode(0);
  let res = copy;
  while(left && right){
      if(left.val<right.val){
          copy.next = left;
          left = left.next
      }else{
          copy.next = right;
          right = right.next
      }
      copy = copy.next;
  }
  copy.next = left?left:right
  return res.next
}


sortList(myList.head)
