/**
 * 给定一个 N 叉树，找到其最大深度。

最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
 */

 /**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function(root) {
  if(root == null){
    return 0
  }
  let max = 0
  for(let child of root.children){
    let depth = maxDepth(child)
    max = Math.max(depth,max)
  }
  return max +1
}