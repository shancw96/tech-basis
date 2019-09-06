/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)//原地排序
  let ans = []
  nums.some((num, index) => {
    // if(num >=0) return true//如果当前（最小数）大于0，那么肯定是不符合要求的
    if (!(index > 0 && nums[index] === nums[index - 1])) {
      //第二次遍历
      //双指针，L R 
      let L = index + 1;
      let R = nums.length - 1;

      while (L < R) {
        let sum = num + nums[L] + nums[R]
        sum
        if (sum === 0) {
          ans.push([num, nums[L], nums[R]])
          while (L < R && nums[R] == nums[R - 1]) R -= 1//重复值，不需要重复计算
          while (L < R && nums[L] == nums[L + 1]) L += 1
          R -= 1
          L += 1
        }
        //移动指针，分为当前总和过大或者过小两种情况
        else sum > 0 ? R -= 1 : L += 1
      }
    }

  })
  ans
  return ans
};

threeSum([-1, 0, 1, 2, -1])