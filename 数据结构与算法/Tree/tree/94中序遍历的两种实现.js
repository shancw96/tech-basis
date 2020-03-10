/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var inorderTraversal = function (root, arr = []) {

  if (root == null) return []
  inorderTraversal(root.left, arr)
  arr.push(root.val)
  inorderTraversal(root.right, arr)
  return arr
};

function inorderTraversal2(root, stack = [], ans = []) {
  if (root == null) return []
  stack.push(root)
  while (stack.length) {
    while (root) {
      root = root.left
      stack.push(root)
    }
    root = stack.pop()
    ans.push(root.val)
    root = root.right
  }
  return ans
}

inorderTraversal2()