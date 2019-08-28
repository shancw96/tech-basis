/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  if(!root) return true
  let left = maxDepth(root.left)
  let right = maxDepth(root.right)
  return Math.abs(left-right)<=1 && isBalanced(root.left) && isBalanced(root.right)
};

function maxDepth(root){
  return root? Math.max(maxDepth(root.left),maxDepth(root.right))+1:0
}