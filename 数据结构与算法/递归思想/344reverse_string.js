var reverseString = function(s) {
  if(s.length <= 0) return s
  return  s[s.length-1]+reverseString(s.slice(1,s.length-1))+s[0]
};


/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s,start_p=0,end_p=s.length-1) {
  while(start_p<end_p){
      [s[start_p++],s[end_p--]] = [s[end_p],s[start_p]]
  }
};