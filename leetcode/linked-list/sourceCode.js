//单向链表

class Node{ //链表节点
  constructor(elem){
    this.val = elem
    this.next = null
  }
}


class NodeList {  //链表 接收数组初始化
  constructor(array){
    array.forEach((elem,index)=>{
      if(index == 0 ) this.head = new Node(elem)//初始化链表的头节点
      else this.insertInNext(elem) 
    })
  }

  insertInNext(newItem){
    let newNode = new Node(newItem);
    let lastNode = this.findLastNode()
    lastNode.next = newNode
  }

  findLastNode(){
    let curNode = this.head;
    while(curNode.next){
      curNode = curNode.next
    }
    return curNode
  }
}

// let myList = new NodeList([1,2,3,4])
module.exports = NodeList
