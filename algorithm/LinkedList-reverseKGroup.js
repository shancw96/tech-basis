function reverseKGroup(head, k) {
  const a = new Node(null);
  a.next = head;
  const b = head;
  for (let i = 0; i < k; i++) {
      // 不足 k 个，不需要反转，base case
      if (b == null) return head;
      b = b.next;
  }

  const newHead = reverse(a, b);

  a.next = reverseKGroup(b.next,k);

  return newHead;
}
console.log(head.toString(head));
// 左开右闭
function reverse(prev, b) {
  const a = prev.next;
  const sucessor = b.next;
  return reverseCore(a, b) 

  function reverseCore(a, b) {
    if (a === b) return b;
    const newHead = reverseCore(a.next, b);
    a.next.next = a;
    a.next = sucessor;
    prev.next = b;
    return newHead;
  }
}