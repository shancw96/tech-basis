var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null
  let target = preorder.shift()

  if (!target) return

  let root = new TreeNode(target)
  if (inorder.length == 1 || preorder.length < 1) return root

  let [left_inorder, right_inorder] = sliceArr(target, inorder)

  root.left = left_inorder.length ? buildTree(preorder, left_inorder) : null
  root.right = right_inorder.length ? buildTree(preorder, right_inorder) : null

  return root
};

function sliceArr(target, inorderArr) {
  let index = inorderArr.findIndex(num => num === target)
  return [inorderArr.slice(0, index), inorderArr.slice(index + 1)]
}
