function searchTarget(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = parseInt(left + (right - left) / 2);

    if (nums[mid] === target) return mid;
    else if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    }
  }
  return null;
}


function left_bound(nums, target) {
  // 边界情况判断
  if (nums[0] > target || nums[nums.length - 1] < target) return -1;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = parseInt(left + (right - left) / 2);

    if (nums[mid] === target) {
      right = mid - 1;
    }
    else if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    }
  }
  return left;
}


function right_bound(nums, target) {
  // 边界情况判断
  if (nums[0] > target || nums[nums.length - 1] < target) return -1;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = parseInt(left + (right - left) / 2);

    if (nums[mid] === target) {
      left = mid + 1;
    }
    else if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    }
  }
  return right;
}


const arr = [1,1,2,2];

console.log(right_bound(arr, 2));