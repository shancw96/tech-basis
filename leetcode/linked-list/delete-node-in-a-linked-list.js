/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
let NodeList = require('./sourceCode')
var deleteNode = function(node) {
  if(node.next.val == 5) node.next = node.next.next
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}

let myList = new NodeList([1,2,3,4])
console.log(myList.head)
