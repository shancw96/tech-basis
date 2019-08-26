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
var preorderTraversal = function(root,arr = []) {
  if(!root) return 
  arr.push(root.val)
  preorderTraversal(root.left,arr)
  preorderTraversal(root.right,arr)
  return arr
};

//先序遍历是优先遍历左节点，左节点结束，再选择父节点的右节点，重复遍历左节点的过程

var preorderTraversal = function(root) {
  let res = []
  let stack = []
  while(root || stack.length){
      while(root){
          res.push(root.val)
          stack.push(root)
          root = root.left
      }
      root = stack.pop()
      root = root.right        
  }
  return res

};
