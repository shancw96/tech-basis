/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode_hash = function(headA, headB) {
    //solution1 从后往前找到第一个不匹配的next n+n+(max n) 3n       空间复杂度 1
    //solution2 先对一条链表进行遍历存储，然后对另外一条进行遍历 匹配 n+max(n)  空间复杂度 n
    let dictionaryA = new Map()

    //存储每个节点
    while(headA){
        dictionaryA.set(headA)
        headA = headA.next
    }
    //匹配节点
    while(headB){
        if(dictionaryA.has(headB)) return headB
        headB = headB.next
    }

    return null
};

//双指针法

/**
 * a + c + b === b + c + a
 * 因为有公共路线 ，所以差距的就是 不相同的部分 。如果指针跑完之后交换位置，跑到公共路线的点，两个指针走过的路程就一样了
 * 
 */