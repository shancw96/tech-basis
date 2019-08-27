/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  if(!postorder.length) return null;//防止输入为空
  let target = postorder.pop();
  let root = new TreeNode(target)
  if(inorder.length == 1 || postorder.length < 1) return root
  let [left_inorder,right_inorder] = sliceArr(target,inorder)
  root.right = right_inorder.length ? buildTree(right_inorder,postorder) : null//倒序，先从右子树开始操作
  root.left = left_inorder.length ? buildTree(left_inorder,postorder) : null
  
  return root
};
  
function sliceArr(target ,inorder ){
  let index = inorder.findIndex(num=>num===target)
  return [inorder.slice(0,index),inorder.slice(index+1)]
}