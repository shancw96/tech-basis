/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 16:41:07
 * @LastEditTime: 2019-08-11 16:43:53
 * @LastEditors: Please set LastEditors
 */
//滑动窗口法
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let window = {};//存放不重复值
  //初始两个指针，用来指向窗户的左右两侧
  let prev = 0;
  let end = 0 ; 
  let maxLen = 0
  //对字符串进行一次遍历，存放非重复的值，如果有重复，则找到最左侧的重复元素，将左指针跳到下一个.并且对当前长度和已经存储的进行大小判断。怎么删除重复节点之前的值？
  while(end<s.length && prev<s.length){
      if(!window[s[end]]){
          window[s[end++]] = true
          maxLen = Math.max(maxLen,end-prev)
      }else{
          delete window[s[prev++]]//删除重复节点之前的值
      }
  }
  return maxLen
};