/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 12:33:29
 * @LastEditTime: 2019-08-10 15:23:08
 * @LastEditors: Please set LastEditors
 */
/**
 * 用 JavaScript 写一个函数，输入 int 型，
 * 返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。
 * 要求必须使用递归函数调用，
 * 不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串
 */

 /**递归是模版套用,用一套模版重复解决相同类型的数据 */
// 1234-->4123-->43 12--> 43 21
 function reversion_int(nums){
   let nums_str = nums+''
   if(nums_str.length ==1) return nums
   let reversed = nums_str.substring(nums_str.length-1)
   return reversed+reversion_int(nums_str.substring(0,nums_str.length-1))
 }

let changed = reversion_int(1234)
