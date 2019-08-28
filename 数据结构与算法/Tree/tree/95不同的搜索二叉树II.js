//给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。
/**
 * Definition for a binary tree node.

 */
/**
 * 当前节点 = 左节点 和 右节点 组成
 * 
 */ 
function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
 }
var generateTrees = function(n) {
    let nodeList = []
    for(let index=0;index<n;index++){
      nodeList[index] = index+1
    }
    return recursion(nodeList)
};
function recursion(nodeList){
  let ans = []
  if(nodeList.length == 0) {
    ans.push(null)
    return ans
  }
  if(nodeList.length == 1) {
    let node = new TreeNode(nodeList.shift())
    ans.push(node)
    return ans
  }
  nodeList.forEach(num=>{
    let [left_list,right_list] = sliceArr(num,nodeList)
   
    let left_arr = recursion(left_list)
    let right_arr = recursion(right_list)

    left_arr.forEach(left=>{
      right_arr.forEach(right=>{
        let root = new TreeNode(num)
        root.left = left;
        root.right = right
        ans.push(root)
      })
    })
  })
  // console.log(ans)
  return ans
}

function sliceArr(target,arr){
  let index = arr.findIndex(num=> num==target)
  return [arr.slice(0,index),arr.slice(index+1)]
}
generateTrees(4)