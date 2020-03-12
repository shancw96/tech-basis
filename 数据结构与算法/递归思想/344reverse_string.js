const logBy = require('../../utils/hoc/recursionLog')
const logStr = logBy((skipedTab,str)=>{
  console.log(skipedTab+str)
})
const logUseless = logBy((skipedTab,useless)=>{
  console.log(skipedTab+useless)
})
var reverseString = function(s,depth=0) {
  if(s.length <= 0) return s
  logStr(depth,s)
  logUseless(depth,'附加信息')
  return  s[s.length-1]+reverseString(s.slice(1,s.length-1),depth+1)+s[0]
};
reverseString('123')

// /**
//  * @param {character[]} s
//  * @return {void} Do not return anything, modify s in-place instead.
//  */
// var reverseString = function(s,start_p=0,end_p=s.length-1) {
//   while(start_p<end_p){
//       [s[start_p++],s[end_p--]] = [s[end_p],s[start_p]]
//   }
// };