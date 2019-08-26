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


var preorderTraversal = function(root,arr = []) {
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
