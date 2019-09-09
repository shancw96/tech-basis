/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let ans = []
  nums.sort((a, b) => a - b) //原地排序
  nums.forEach((item, index) => {
    if (!(index > 0 && nums[index] === nums[index - 1])) {
      let resArr = twoSum(nums.slice(index + 1),-item)
      resArr.length ?ans = [...ans,...resArr.map(arr=>[item,...arr])] : ''
    }
  })
  return ans
};

var twoSum = function (nums, target) {
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
    } else sum > target ? R -= 1 : L += 1
  }
  return ans
};

let ans = threeSum([-1, 0, 1, 2, -1, -4])

console.log(ans.forEach(arr=>console.log(arr)))