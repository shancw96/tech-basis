/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  nums.sort((a, b) => a - b)
  const ans = []
  let L = 0
  let R = nums.length - 1
  while (L < R) {
    let sum =nums[L] + nums[R]
    if (sum === target) {
      ans.push([nums[L], nums[R]])
      while (L < R && nums[R] == nums[R - 1]) R -= 1 //重复值，不需要重复计算
      while (L < R && nums[L] == nums[L + 1]) L += 1
      R -= 1
      L += 1
    } else sum > 0 ? R -= 1 : L += 1
  }
  return ans
};

let ans = twoSum([1, 1, 1, 1,0,2], 2)
console.log(ans)