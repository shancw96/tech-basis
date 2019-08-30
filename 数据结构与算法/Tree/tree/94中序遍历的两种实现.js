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
var inorderTraversal = function (root) {
  let res = []
  let stack = []
  while (root || stack.length) {//这是第二步操作，右节点再次遍历，为了能够在第一次的时候就进去，所以必须的root存在
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()//将root重新设置为父节点
    res.push(root.val)
    root = root.right//再遍历右子节点      
  }
  return res

};

//中序遍历虽然宏观上优先显示左节点，但是，这个左节点，其实是父节点。父节点的左子节点为空，才会触发打印，这时候打印的是父节点，也就是中间的节点，所以叫中序遍历
var inorderTraversal = function(root,arr = []) {
    
  if(root == null)  return []
  inorderTraversal(root.left,arr)
  arr.push(root.val)
  inorderTraversal(root.right,arr)
  return arr
};