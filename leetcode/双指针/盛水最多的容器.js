var maxArea = function(height) {
  let left = 0;
  let right = height.length-1
  let max = 0
  while(left !==right ){
      let width = right-left
      let min =  height[left]>height[right]?height[right]:height[left]
      max = Math.max(min*width,max);
      height[left]>height[right]?right-=1:left+=1;
  }
  return max
};
maxArea([1,8,6,2,5,4,8,3,7])