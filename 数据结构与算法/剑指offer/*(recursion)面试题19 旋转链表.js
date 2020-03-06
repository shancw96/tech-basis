/**
 * https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/submissions/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    //获取到了最后一个节点
    if(!head || !head.next) return head
    const reversedHead = reverseList(head.next)
    //转换head 的指向，将后一个指针(head.next.next)指向前一个(head)
    head.next.next = head
    head.next = null
    //返回相同的reversedHead 保证返回head不变
    return reversedHead
};