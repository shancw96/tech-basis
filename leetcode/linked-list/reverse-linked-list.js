/**
 * 反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-linked-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
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
  let prev = null ;
  let curr = head;
  while(curr!==null){
      let tempCurr = curr.next;//防止链断裂
      curr.next = prev;//改变next指针指向
      prev = curr //改变prev指向为curr  or  移动prev到curr
      curr = tempCurr //找到之前的链      
      // [curr.next,prev,curr] = [prev,curr,curr.next]
  }
  return prev
};