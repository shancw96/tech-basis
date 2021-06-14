const {LinkedList} = require('./utils')

const linkedList = new LinkedList([1,2,1])

function isPalindrome(head) {
  let left = head;
  return travel(head);

  function travel(right) {
    if (!right) return true;
    let ans = travel(right.next);
    ans = ans && right.val === left.val;
    left = left.next;
    return ans;
  }
}


console.log(isPalindrome(linkedList.head));