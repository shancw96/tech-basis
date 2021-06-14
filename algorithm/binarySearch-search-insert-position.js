function searchInsert(nums, target) {
  if(target < nums[0]) return 0;
  if (target > nums[nums.length -1]) return nums.length;

  let left = 0;
  let right = nums.length - 1;

  while(left <= right) {
    const mid = parseInt(left + (right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (target < nums[mid]) {
      right = mid -1;
    }
    else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return left
}

console.log(searchInsert([1], 2));