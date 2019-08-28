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
var isSymmetric = function(root) {
  if(!root) return true
  return isSame(root.left,root.right)
};

function isSame(left_tree,right_tree){
  if(left_tree == null && right_tree == null) return true
  if(left_tree == null || right_tree == null) return false
  return left_tree.val == right_tree.val && isSame(left_tree.left,right_tree.right) && isSame(left_tree.right,right_tree.left)
}