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
var levelOrder = function(root,stack = [],res = [],depth = 0) {
  if(root == null) return []
  stack.push(root)
  while(stack.length){
      let curLayer = stack.length;
      while(curLayer){
          curLayer -= 1;
          let cur = stack.shift()
          //动态初始化二维数组
          if( !(res[depth] instanceof Array)) res[depth] = new Array()
          res[depth].push(cur.val)
          //子节点入栈
          cur.left ? stack.push(cur.left) :''
          cur.right ? stack.push(cur.right) : ''
      }
      //当前层执行完毕,深度+1
      depth+=1
  }
  return res
};
