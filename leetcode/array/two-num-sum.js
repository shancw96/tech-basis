var twoSum = function(nums, target) {
  let hash = {};
  let result = []
  for(let index in nums){
      hash[target - nums[index]] = nums[index]
  }
  for(let index = 0;index<nums.length ;index++){
      if(hash[nums[index]] !== undefined){
          console.log(hash[nums[index]])
          //对 减数 相同的情况进行判断
          if(nums[index]==3 && !isOnly(nums,nums[index])){
              continue
          }
          result.push(index)
      }
  }
  return result
}

var isOnly = function(arr,target){
  return arr.filter(num=>target == num).length <=1? false:true
}
twoSum([3,2,4],6)