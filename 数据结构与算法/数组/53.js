var maxSubArray = function (nums,curPos = nums.length-1) {
  if (nums.length == 1) return nums[0]
  let ans = nums[0]
  let preNums = nums.slice(0, nums.length - 1)
  let preMax = maxSubArray(preNums,--curPos)
  ans = Math.max(preMax, preMax + nums[i])
  return ans
};
let ans = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
console.log(ans)