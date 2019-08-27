//前序+中序 
//根据前序的顺序，获取root。root的左侧数组为左子树，root的右侧数组为右子树
//当前root root.left  root.right 整理好了之后
//root = root.left 以root.left 为根节点，root的左侧数组为整个数组。再重复上述顺序
//同样对root.right 进行同样的操作

//分治的思想

//8years
/**
 * 前提8岁小孩得理解前序遍历是什么；
 * 根据前序遍历的数组，获取根节点。[3] [9,20,15,7]
 * 当根据前序遍历的数组，获取到根节点后，我们重建的第一个节点就获取到了
 * 中序遍历的性质：left root right假设有这么个数组[9,3,15,20,7]
 * 当找到root[3]之后，它的左子树就应该是 [9]，右子树就应该是[15,20,7]
 * 
 * 把前序遍历弹出的节点值，作为树，重复执行上述操作。(左子树先执行，执行结束再执行右子树)
 * 通过root.left = ... 递归  进行不同节点的连接
 * 
 * 为什么前序可以直接出栈，而不考虑左右节点区别
 * 根据前序可以得出根节点，根据根节点可以划分左右子树。
 * 前序的第二个节点就是左子树的根节点，又可以再次划分。依次类推。举个例子，可以划分成下面的样子
 * 前序遍历：[a,b,d,e,c]
 * 中序遍历[d,b,e,a,c]
 * ********对左子树******************************
          *                     [a]//前序遍历根节点为第一个,根据中序遍历得到下面的两个数组
          * [d,b,e]//左子树                    [
 *            [b]//根据前序遍历，第二个节点为左子树的根节点，那么我们重复上面的操作，再次以b为root进行分割，得到下面两个数组
*       [d]//左子树   [e]//右子树          //到这里，对d，e执行相同操作后，被切割数组长度为0，结束当前递归
*                                 ******对右子树**********
*                                [a]
*                                       [c]//... , 被切割长度为0，返回null
 */

 //为什么左子树结束可以
 function TreeNode(val) {
       this.val = val;
       this.left = this.right = null;
}

var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null
  let target = preorder.shift()
  let root = new TreeNode(target)
  if ( preorder.length < 1) return root
  let [left_inorder, right_inorder] = sliceArr(target, inorder)
  root.left = left_inorder.length ? buildTree(preorder, left_inorder) : null //左子树为空直接返回null
  root.right = right_inorder.length ? buildTree(preorder, right_inorder) : null//右子树为空直接返回null

  return root
};

function sliceArr(target, inorderArr) {
  let index = inorderArr.findIndex(num => num === target)
  return [inorderArr.slice(0, index), inorderArr.slice(index + 1)]
}
let res = buildTree([1,2],[1,2])
console.log(res)