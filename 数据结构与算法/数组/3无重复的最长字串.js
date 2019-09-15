var lengthOfLongestSubstring = function(s) {
  if(!s.length) return 0
  let point_slow = 0;
  let point_fast = 0;
  let hash = {}
  let ans = 1
  for( ; point_fast<s.length;point_fast+=1){
      let curChar = s[point_fast]
      if(hash[curChar]){//子串存在重复
          //将slow移动到发现地的下一个
          point_slow = Math.max(hash[curChar], point_slow);
          // point_slow = hash[curChar]
          console.log(point_slow)
         // w的更新在计算start之后
      }//不存在重复,比较当前的len 与 ans的大小
      ans = Math.max(ans,point_fast - point_slow + 1)
      hash[curChar] = point_fast+1
  }

  return ans
};
lengthOfLongestSubstring('abba')