/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root,depth=0,res = [],stack = []) {
  if(root == null) return []
  stack.push(root)
  while(stack.length){
      res[depth] = []
      let curLayer = stack.length;
      while(curLayer){
          curLayer -= 1;
          let curNode = stack.shift()
          res[depth].push(curNode.val)
          //存储左右节点
          curNode.left ? stack.push(curNode.left):''
          curNode.right ? stack.push(curNode.right):''
      }
      depth += 1
  }
  return res
};