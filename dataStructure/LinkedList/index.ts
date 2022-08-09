export class Node {
  val: any;
  next: any;
  constructor(val?: any) {
    this.val = val;
    this.next= null
  }
}
// utils 


/**
 * @description reverse whole linkedList
 * @return reversed head
 */
export function reverse(head: Node): Node {
  if (!head || !head.next) return head;
  const newHead = reverse(head.next);
  head.next.next = head;
  head.next = null
  return newHead;
}

/**
 * @description reverse 前M个节点
 * @return reversed head
 */

export function reverseFirstM(head: Node, m: number): Node {
  let successor: any = null

  return reverseCore(head, m);

  function reverseCore(head: Node, m: number): Node {
    if (m === 1) {
      successor = head.next;
      return head;
    }
    const newHead = reverseCore(head.next, m - 1);
    head.next.next = head;
    head.next = successor;
    return newHead;
  }
}

/**
 * @description reverse 前M后N个节点
 * @return reversed head
 */
export function reverseBetweenMN(head: Node, left: number, right: number) {
  if (left === 1) {
    return reverseFirstM(head, right);
  }

  const newHead = reverseBetweenMN(head.next, left - 1, right - 1);
  head.next = newHead;
  return head;
}

/**
 * @description 合并两个有序递增链表
 */
export function mergeTwoLinkedList(head1: Node, head2: Node): Node {
  let predecessor = new Node();
  let newHead = predecessor;
  while(head1 && head2) {
    if (head1.val < head2.val) {
      newHead.next = new Node(head1.val)
      head1 = head1.next;
    }else {
      newHead.next = new Node(head2.val)
      head2 = head2.next;
    }
    newHead = newHead.next;
  }
  while(head1) {
    newHead.next = new Node(head1.val);
    head1 = head1.next;
    newHead = newHead.next
  }
  while(head2) {
    newHead.next = new Node(head2.val);
    head2 = head2.next;
    newHead = newHead.next;
  }
  return predecessor.next;
}

/**
 * @description 合并K个有序递增链表
*/
export function mergeKLinkedList(headList: Node[]): Node {
  // 当长度为1，直接返回此有序链表
  if (headList.length <= 1) return headList[0]
  const mid = headList.length / 2
  return mergeTwoLinkedList(
    mergeKLinkedList(headList.slice(0, mid)),
    mergeKLinkedList(headList.slice(mid))
  );
}

/**
 * @description judge linked list has circle?
 * @return {Boolean} 
 */
export function hasCircle(head: Node) {

}
