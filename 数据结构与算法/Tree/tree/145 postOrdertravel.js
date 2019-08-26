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
var postorderTraversal = function(root) {
  if(root == null) return []
  let stack = []
  let res = []
  while(root || stack.length){
      while(root){
          res.unshift(root.val)
          
          stack.push(root)
          root = root.right
      }
      root = stack.pop()
      root = root.left
  }
  return res
};
/**
 * 
 * 前序遍历和后序遍历之间的关系：

前序遍历顺序为：根 -> 左 -> 右

后序遍历顺序为：左 -> 右 -> 根

如果1： 我们将前序遍历中 节点插入 结果链表 的尾部 的逻辑，修改为将节点插入结果链表的头部

那么结果链表就变为了：右 -> 左 -> 根

如果2： 我们将遍历的顺序由从左到右修改为从右到左，配合如果1

那么结果链表就变为了：左 -> 右 -> 根

这刚好是后序遍历的顺序
 */

