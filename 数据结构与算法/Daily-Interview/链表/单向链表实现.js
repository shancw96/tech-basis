class Node {
  constructor(val){
    this.val = val;
    this.next = null
  }
}

class NodeList{
  constructor(array){
    array.forEach((val,index)=>{
      index == 0?this.head = new Node(val) : this.insertNewNode(val)
    })
  }
  insertNewNode(val){
    let cur = this.head ;
    while(cur.next){
      cur = cur.next
    }
    cur.next = new Node(val)
  }
  /**
   * ohter methods
   * ...
   * ...
   * ..
   *  */

}

let myNodeList = new NodeList([1,2,3,4,5])

console.log(myNodeList)