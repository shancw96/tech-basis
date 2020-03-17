/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return nums.reduce((frequency,curNum)=>
        curNum === target ? frequency+1 : frequency
    ,0)
};