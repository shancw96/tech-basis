/*
 * @Description: three sum
 * @Author: your name
 * @Date: 2019-08-11 17:31:25
 * @LastEditTime: 2019-08-11 17:32:19
 * @LastEditors: Please set LastEditors
 */
/**
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

 */

 /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  /***排序+双指针*****/
  //双指针：定义sum i j;sum为待匹配数下标，i和j为需要移动的下标
  //双层嵌套，排序的作用，1.当nums[0]大于0时，直接结束循环。2.重复的值直接跳过
  
};