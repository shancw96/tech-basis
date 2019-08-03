// var lengthOfLongestSubstring = function(string) {

//   let hashTemp = {}
//   let origin_arr = string.split('')
//   let maxSubStr = ''
//   let change_str = origin_arr.reduce((prev,cur,index,arr)=>{
//       if(index>0){
//           if(hashTemp[cur]!==undefined){
//               hashTemp = {}
//               hashTemp[cur] = index
//               return prev+','+cur
//           }else{
//               hashTemp[cur] = index
//               return prev+cur
//           }
//       }else{
//           hashTemp[cur] = index
//           return cur
//       }
//   },'')
//   change_str.split(',').forEach(subStr=>{
//     subStr.length > maxSubStr.length ? maxSubStr = subStr : ''
//   })
//   return maxSubStr.length
// };

var lengthOfLongestSubstring = function (s) {
  let hashMap = {};
  let ans = 0;
  for (let end = 0, start = 0; end < s.length; end++) {
    if (hashMap[s[end]]) {
      start = Math.max(hashMap[s[end]], start)//移动start位置到重复元素的下一个
    }
    ans = Math.max(ans, end - start + 1);
    hashMap[s[end]]=end + 1 //保存index为重复元素的下一个
  }
  return ans;
};
lengthOfLongestSubstring('dvdf')

