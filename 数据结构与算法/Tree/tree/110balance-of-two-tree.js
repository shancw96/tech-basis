let BST = require('../source')
let myTree = new BST()
myTree.create([15,2,16])

function isBalanced(root){
  if(root == null) return true
  console.log(DFS(root.left))
  console.log(DFS(root.right))
  // return Math.abs(DFS(root.left)-DFS(root.right))>1? false : true
}


function DFS(root){15
  if(root == null) return 0
  return Math.max(DFS(root.left),DFS(root.right))+1
}

let result = isBalanced(myTree.root)
// console.log(result)