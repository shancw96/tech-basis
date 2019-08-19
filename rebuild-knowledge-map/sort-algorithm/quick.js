let createRandom = require('./common')
let arr_ori = createRandom(100);
console.log(arr_ori)
function quickSort(arr_ori,left=0,right=arr_ori.length-1){
  if(left>right) return //子问题最底层结束的条件
  let target = arr_ori[left];
  let p_left = left;
  let p_right = right;
  
  while(p_left!==p_right){
    
    //从右侧查找比基准值小的
    while(target<=arr_ori[p_right] && p_left<p_right) p_right -=1;
    
    //从左侧找到比基准值大的
    while(target>=arr_ori[p_left] && p_left<p_right) p_left += 1;

    //交换找到的两个值
    [arr_ori[p_left],arr_ori[p_right]] = [arr_ori[p_right],arr_ori[p_left]]
  }
  //两个指针相遇，把target放到中间。
  [arr_ori[left],arr_ori[p_left]] = [arr_ori[p_left],arr_ori[left]]
  quickSort(arr_ori,left,p_left-1);
  quickSort(arr_ori,p_left+1,right)
  // console.log(arr_ori)
  return arr_ori
}
let res = quickSort(arr_ori)
console.log(res)