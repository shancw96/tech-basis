class Node{
  constructor(data,left,right){
    this.data = data;
    this.left = left;
    this.right = right;
  }
  show(){
    return this.data
  }
}

class BST{
  constructor(){
    this.root = null;
  }
  insert(data){
    let n = new Node(data,null,null);
    if(this.root == null){
      this.root = n
    }else{
      let cur = this.root;
      var parent 
      while(true){
        parent = cur//保存当前层的父节点，当子节点cur节点为空时，将data赋值给当前的parent.left或则会right
        if(data<cur.data){
          cur = cur.left;
          if(cur === null){
            parent.left = n;
            break;
          }
        }else{
          cur = cur.right;
          if(cur == null){
            parent.right = n;
            break;
          }
        }
      }
    }
  }
  //前中后序的遍历，其实入栈相同的次数，不同处只是选取不同的步骤进行操作而已,图示的箭头就表示打印的过程
  prevOrder(node=this.root){
    if(node == null) return ;
    console.log(node.data)
    this.prevOrder(node.left);
    this.prevOrder(node.right)
  }
  inOrder(node=this.root){
    if(node == null) return ;
    this.inOrder(node.left)
    console.log(node.data)
    this.inOrder(node.right)
  }
  postOrder(node = this.root){
    if(node == null) return ;
    this.inOrder(node.left)
    this.inOrder(node.right)
    console.log(node.data)
  }

}

let newTree = new BST();

for(let item of [50,10,70,5,15,60,80]){
  newTree.insert(item)
}
console.log('=====inorder-======')
newTree.inOrder()
console.log('=====prevorder-======')
newTree.prevOrder()