//单向链表

class Node{ //链表节点
  constructor(elem){
    this.val = elem
    this.next = null
  }
}


class NodeList {  //链表 接收数组初始化
  constructor(array){
    if(Object.prototype.toString.call(array) !== '[object Array]'){
      array = [array]//输入单个树
    }
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

  toString(){
    let curNode = this.head;
    let strList = [];
    while(curNode.next){
      strList.push(JSON.stringify(curNode.val));
      curNode = curNode.next
    }
    strList.push(JSON.stringify(curNode.val))
    return strList.join('->')
  }
  reverse(){
    let prev = null;
    let curr = this.head;
    while(curr!==null){
      let tempCurr = curr.next;
      curr.next = prev; //next 指向prev指向的内存段
      prev = curr;//prev指向curr指向的内存段
      curr = tempCurr//curr指向下一个内存段
    }
    return prev
  }
}

// let myList = new NodeList([1,2,3,4])
module.exports = NodeList


