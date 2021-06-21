function LinkedList(rawArray) {
  if (!rawArray instanceof Array) throw new Error("unexpect type detected!");
  this.head = create(rawArray);
}
function create (array) {
  if (!array instanceof Array || array.length === 0) return null;
  let curNode = new Node(array[0]);
  curNode.next = create(array.slice(1));
  return curNode;
}

LinkedList.prototype.forEach = function(fn) {
  let cur = this.head;
  while(cur){
    fn(cur)
    cur = cur.next
  }
}

LinkedList.prototype.tail = function() {
  let head = this.head;
  while(head && head.next) {
    head = head.next;
  }
  return head
}
LinkedList.prototype.add = function(val) {
  let tail = this.tail();
  tail.next = new Node(val)
  tail = tail.next;
  return tail
} 
function Node(val) {
  this.val = val;
  this.next = null;
}

LinkedList.toString = (node) => {
  let str = 'head';
  while(node && node.val) {
    str = `${str} -> ${node.val}`
    node = node.next;
  }
  return str;
}

module.exports = {
  LinkedList,
  Node
};
