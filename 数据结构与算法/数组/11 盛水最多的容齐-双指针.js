/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let left = 0;
  let right = height.length-1
  let ans = 0
  while(left<right){
      let curMinHeight = Math.min(height[left],height[right])
      let curWidth = right-left
      ans = Math.max(ans,curMinHeight*curWidth)
      height[left]<height[right] ? left+=1 : right-=1
  }
  return ans
};