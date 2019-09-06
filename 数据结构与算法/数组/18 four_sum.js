var fourSum = function(nums, target) {
  let ans = []
  nums.sort((a,b)=>a-b)
  nums.some((num,index)=>{
    if(num >= target) return true
    ans = [...ans,...threeSum(nums.slice(index+1),target,num)]
    ans
  })
};





var threeSum = function (nums,target,cur) {
  // nums.sort((a, b) => a - b) 从外层原地排序
  let ans = []
  nums.some((num, index) => {
    // if(num >=target-cur) return true//如果当前（最小数）大于目标，那么肯定是不符合要求的
    if (!(index > 0 && nums[index] === nums[index - 1])) {
      //第二次遍历
      //双指针，L R 
      let L = index + 1;
      let R = nums.length - 1;
      while (L < R) {
        let sum = cur+num + nums[L] + nums[R]
        if (sum === target) {
          ans.push([cur,num, nums[L], nums[R]])
          while (L < R && nums[R] == nums[R - 1]) R -= 1//重复值，不需要重复计算
          while (L < R && nums[L] == nums[L + 1]) L += 1
          R -= 1
          L += 1
        }
        //移动指针，分为当前总和过大或者过小两种情况
        else sum > target ? R -= 1 : L += 1
      }
    }
  })
  return ans
};


fourSum([1, 0, -1, 0, -2, 2],0)