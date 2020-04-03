/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    //1. for loop  n
    //2. sort (nlogn) + loop n
    nums.sort()
    let index = 0
    while(index<nums.length){
        if(nums[index] == nums[index+2]){
            index += 3
        }else{
            return nums[index]
        }
    }
};

console.log(singleNumber([]))