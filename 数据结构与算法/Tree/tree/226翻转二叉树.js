/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if(!root) return null
  let resNode = new TreeNode(root.val)
  resNode.left = invertTree(root.right)
  resNode.right = invertTree(root.left)
  return resNode
};

