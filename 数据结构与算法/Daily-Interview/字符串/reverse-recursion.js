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

 function reversion_int(nums){
  let str = nums+''
  if(str.length == 1) return nums
  let head = str.substring(str.length-1);
  let curStr = reversion_int( str.substring(0,str.length-1))
  let res = head+curStr
  return res
 }
 //reversion_int().reversion_int().reversion_int()....reversion_int()
 //结束条件就是


 
// function reversion_int(nums){
//   let str = nums+''
//   return str.length == 1 ?nums :str.substring(str.length-1)+reversion_int(str.substring(0,str.length-1))
//  }

//  console.log(reversion_int(3456))

function reverse(nums){
  let nums_str = nums+'';
  // if(str.length == 1) return nums;

  //反转最后一位到未操作过的原始字符串的头部,这就是当前递归需要做的
  let tail = nums_str.substring(nums_str.length-1)
  let curStr = reverse(nums_str.substring(0,nums_str.length-1))

  return tail+curStr//返回的是处理好的当前层
}