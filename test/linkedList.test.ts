import { Node, mergeTwoLinkedList } from "../dataStructure/LinkedList"
import { toArray } from "../dataStructure/LinkedList/utils";

describe('linkedList test cases', () => {
  let headAGlobal: Node
  let headBGlobal: Node
  let headCGlobal: Node
  beforeEach(() => {
    const headA = new Node(1);
    const head3 = new Node(3);
    const head5 = new Node(5);
    headA.next = head3;
    head3.next = head5;

    const headB = new Node(2);
    const headB4 = new Node(10);
    const headB6 = new Node(20);
    const headB8 = new Node(30);
    headB.next = headB4;
    headB4.next = headB6;
    headB6.next = headB8;

    const headC = new Node(11);
    const headC4 = new Node(21);
    headC.next = headC4;

    headAGlobal = headA;
    headBGlobal = headB;
    headCGlobal = headC;
  })
  it('merge 2 sorted list', () => {
    let ans = mergeTwoLinkedList(headAGlobal, headBGlobal)
    expect(toArray(ans)).toEqual([1,2,3,4,5,6,7,8]);
  })
  it('merge K sorted list', () => {
  })
})