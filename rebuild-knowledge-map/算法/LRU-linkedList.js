const {LinkedList} = require('./utils')
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.head = new Node(null,null);
  this.limit = capacity

};
function Node(key,value) {
  this.key = key
  this.val = value;
  this.next = null;
}
LRUCache.prototype.find = function(key) {
  // 链表遍历
  let vaildHeadNode = this.head.next;
  while(vaildHeadNode){
    if(vaildHeadNode.key === key){
      return vaildHeadNode
    }
    vaildHeadNode = vaildHeadNode.next
  }
  return -1
}
// 从链表中截取节点
LRUCache.prototype.pick = function(key) {
  let node = this.find(key)
  let node_val = node.val
  let node_key = node.key
  if(!node.next){
    node.val = null
    node.key = null
    node.next = null
  }else{
    node.val = node.next.val;
    node.key = node.next.key;
    node.next = node.next.next;
  }
  return new Node(node_key,node_val)
}
// 判断长度是否超过限制，如果超过则删除尾部数据
LRUCache.prototype.check = function() {
  let count = 0;
  let move_node = this.head
  //  移动到限制的最后一个节点，并进行截取
  while(count < this.limit && move_node){
    move_node = move_node.next
    count += 1;
  }
  if(move_node && move_node.next) move_node.next = null;
}
LRUCache.prototype.insertHead = function(node){
  node.next = this.head.next
  this.head.next= node
}
/** 
 * @description 找到node，提取出来，放到头部
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if(this.find(key) === -1) return null;
  this.insertHead(this.pick(key))
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  // 如果已经有key，则取出链表中的node，并修改数据后放在头部
  // 如果没有，则直接放在头部
  let node = this.find(key) !== -1 ? this.pick(key) : new Node(key,value)
  node.next = this.head.next
  this.head.next = node
  this.check();
  return this.head.next
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
