let BST = require('../source')
let myTree = new BST()
let arr = [5,2,3,0,0,7,9,10,11,1111,1111,111111]
for(let i of arr){
  myTree.insert(i)
}
// console.log(myTree.root)
 
// let record = []
function DFS(node,depth=0,record=[]){
  if(node == null) return 

  record.push({
    node:node,
    depth:depth
  })//record是先序遍历，为什么不会回滚到之前的状态，因为他是引用类型啊！，回滚之后，指针指向的还是当前内存

  DFS(node.left,depth+1,record)//二叉树的两次遍历，走完了全部的节点，根据console的位置不同，产生前中后三种遍历方式，但是depth是和console不相关的，depth经历了全部遍历过程
  DFS(node.right,depth+1,record)//depth递归为什么不产生重复，因为每一层递归记录了当前层的depth信息，每上一层都是不一样的，所以当前层结束，除非手动return，否则depth记录的是上一层信息
  
  return record
}

// let result = DFS(myTree.root)
function testDFSofReference(node,depth=0,record=[]){
  if(node == null) return ;
  record[0]==undefined?record.push(depth):record[0] = Math.max(record[0],depth)
  testDFSofReference(node.left,depth+1,record)
  testDFSofReference(node.right,depth+1,record)
  return record[0]
}


console.log(testDFSofReference(myTree.root))