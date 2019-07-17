let maxDepth = function (root){
  if(root == 0){
    return 0
  }

  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right)

  return Math.max(leftDepth,rightDepth)+1
}