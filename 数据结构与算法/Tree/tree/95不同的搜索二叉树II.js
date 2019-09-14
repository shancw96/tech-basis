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
// var generateTrees = function(n) {
//     let nodeList = []
//     for(let index=0;index<n;index++){
//       nodeList[index] = index+1
//     }
//     return recursion(nodeList)
// };
// function recursion(nodeList){
//   let ans = []
//   if(nodeList.length == 0) {
//     ans.push(null)
//     return ans
//   }
//   if(nodeList.length == 1) {
//     let node = new TreeNode(nodeList.shift())
//     ans.push(node)
//     return ans
//   }
//   nodeList.forEach(num=>{
//     let [left_list,right_list] = sliceArr(num,nodeList)
   
//     let left_arr = recursion(left_list)
//     let right_arr = recursion(right_list)

//     left_arr.forEach(left=>{
//       right_arr.forEach(right=>{
//         let root = new TreeNode(num)
//         root.left = left;
//         root.right = right
//         ans.push(root)
//       })
//     })
//   })
//   // console.log(ans)
//   return ans
// }

function sliceArr(target,arr){
  let index = arr.findIndex(num=> num==target)
  return [arr.slice(0,index),arr.slice(index+1)]
}
// generateTrees(4)

function generateTrees(nums){
  let nodeList = []
  //创建一个 1-num 的数组
  for(let i =1 ;i <= nums.length;i++){
    nodeList.push(i)
  }
  //递归创建node
  createTrees(nodeList)
}

function createTrees(nodeList){
  //根据curNdoe切割数组,如果NodeList列表只有一个数，那么说明这个数就是最终的节点，返回条件
  let ans = []//结果数组
  // 确定返回条件为：nodeList只有一个数
  if(nodeList.length == 1) {//将节点包装成数组
    ans.push(new NodeList(nodeList[0]))
    return ans
  }
  //以循环的某一个节点，将节点数组进行切割
  nodeList.forEach(node=>{
    //根据node 切割数组
    let [leftTrees,rightTrees] = sliceArr(node)
    //递归创建左侧树和右侧树
    let leftNodeList = createTrees(leftTrees)
    
    let rightNodeList = createTrees(rightTrees)
    //左侧树 结合 右侧树 每一个节点作为左节点和右节点，什么的做节点和右节点
    leftNodeList.forEach(left=>{
      rightNodeList.forEach(right=>{
        let root = new TreeNode(node)
        root.left = left;
        root.right = right
        ans.push(root)
      })
    })
  })
  return ans
}