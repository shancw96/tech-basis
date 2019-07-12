/**
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

示例 1:

输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
示例 2:

输入: nums = [1], k = 1
输出: [1]

 */

var topKFrequent = function(nums, k) {
  let hash = {}
  nums.forEach(num=>{
    hash[num]?hash[num]+=1:hash[num]=1
  })
  var tempArr = Object.keys(hash).sort((key1,key2)=>hash[key2]-hash[key1]).slice(0,k)
  console.log(tempArr)
};

topKFrequent([6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0],6)