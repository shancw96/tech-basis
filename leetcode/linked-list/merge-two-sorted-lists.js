/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// requr NodeList from "./sourceCode.js";
let NodeList = require('./sourceCode')

var mergeTwoLists = function(l1, l2) {
  let l1P = l1.head;
  let l2P = l2.head
  while(l2P){
    let tempLink1 = l1P.next;
    let tempLink2 = l2P.next;
    // l1P.next = l2P;
    // l1P = tempLink1
    // l2P.next = l1P.next
    // l2P = tempLink2
    l2P.next = l1.next
    l1P.next = l2P
    
}
// return l1P
console.log(l1P)
};
let l1 = new NodeList([1,3,5])
let l2 = new NodeList([2,4,6])
mergeTwoLists(l1,l2)