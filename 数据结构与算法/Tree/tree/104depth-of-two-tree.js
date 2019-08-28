let maxDepth = function (root){
  if(root == 0){
    return 0
  }

  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right)

  return Math.max(leftDepth,rightDepth)+1
}

//使用引用类型，辅助传递变量
function testDFSofReference(node,depth=1,record=[]){
  if(node == null) return 0;
  record[0]==undefined?record.push(depth):record[0] = Math.max(record[0],depth)
  testDFSofReference(node.left,depth+1,record)
  testDFSofReference(node.right,depth+1,record)
  return record[0]
}