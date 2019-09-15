var maxSubArray = function(nums) {
  let subMax = [nums[0]]
  let ans = nums[0]  
  for(let i = 0 ;i < nums.length-1;i++){
      subMax[i+1] = Math.max(subMax[i]+nums[i+1],nums[i+1])
      ans = Math.max(ans,subMax[i+1])
  }
  return ans
};
