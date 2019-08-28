/**
 * @param {number} n
 * @return {number}
 */
/**
 * 
 * 首先根据n的大小生成一个节点数组
 * 然后再根据这个节点数组进行组合判断
 * 
 * 首先明确一点
 * 根节点的可能性 = 左子树的可能性  * 右子树的可能性
 * 
 * 那么可以进行类推，将问题简单化
 * root_chance = leftTree_chance * rightTree_chance
 *                                root_chance                                         
 *                l_chance                           r_chance                         可能性 l_chance * r_chance
 *       l_chance         r_chance          l_chance         r_chance                 可能性 ...
 *      ...    ...      ...        ...    ...       ...       ...       ...
 *   chance=1  ...    ...       ...       ...        ....            ..    chance=1                                                                           
 * 因为每一个节点都能作为根节点，所以挨个作为根节点，划分他们的左右子树，[当节点数组长度为1时，那么只有一种可能性]
 * 左子树的可能性 = 左子树的左子树 * 左子树的右子树  以此类推。当节点为单节点时，向上传递值，得到左子树的可能性。
 * 同理得到右子树的可能性
 * 
 * 所以当前节点的可能性ans = 左子树*右子树
 * 一共有n个数，一次循环累加得到最终答案ans
 * arr.forEach(chance=>{
 *    ans += chance
 * })
 * 
 * 因为只求不同长度可能性，存在重复计算长度的情况，所以使用memo = {} 存储不同长度的可能性
 */
var numTrees = function(n) {
  let nodeList = []
  for(let index=0;index<n;index++){
      nodeList[index] = index+1
  }
  return recursion(nodeList)
};

function recursion(nodeList,hash={}){
  if(hash[nodeList.length]) return hash[nodeList.length]
  let ans = 0
  if(nodeList.length == 0 || nodeList.length == 1) {
      return 1
  }
  nodeList.forEach(num=>{
      let [left_list,right_list] = sliceArr(num,nodeList)
      let left_chance = recursion(left_list,hash)
      let right_chance = recursion(right_list,hash)
      ans += left_chance*right_chance
  })
  hash[nodeList.length] = ans
  return ans
}

function sliceArr(target,arr){
  let index = arr.findIndex(num=> num==target)
  return [arr.slice(0,index),arr.slice(index+1)]
}