function twoSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while(left < right) {
    const tempSum = nums[left] + nums[right];
    if (tempSum == target) return [left + 1, right + 1];
    else if (tempSum < target ) {
      left = binary_search(nums, target - nums[right], 'right');;
    }
    else if (tempSum > target) {
      right = binary_search(nums, target - nums[left], 'left');
    }
  }
  return false
}

function binary_search(nums, target, mode) {
  let left = 0;
  let right = nums.length - 1;
  while(left <= right) {
    const mid = parseInt(left + (right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] > target) {
      right = mid - 1;
    }
    else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return mode === 'left' ? right : left;
}
