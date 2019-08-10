/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 13:33:04
 * @LastEditTime: 2019-08-10 15:23:08
 * @LastEditors: Please set LastEditors
 */
// 给定一个二叉树，找出其最大深度。

// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if(!root) return 0//当前树为空的时候，深度为0
  let leftDepth = maxDepth(root.left)
  let rightDepth = maxDepth(root.right)
  return Math.max(leftDepth,rightDepth)+1//返回值为当前树的深度
};

/**
 * 每次递归的全是树，而不是看成节点
 * 
 * 终止条件：当前树为空的时候，深度为0
 * 返回给上一层的信息是什么：当前树的最大深度
 * 本层递归要做的事情：得到根节点的深度。当前树只有左子树 右子树 和根树。我们需要的是根树的深度；
 * 根节点的深度：选择左节点或者右节点的深度，在其基础上+1
 */