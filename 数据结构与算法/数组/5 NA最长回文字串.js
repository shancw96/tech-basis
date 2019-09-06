/**
 * @param {string} s
 * @return {string}
 */
let longestPalindrome = function(s) {
  console.log('code in ')
    let cur_pal = []
    let ans = []
    for(let i = 0 ;i<s.length-1;i++){
      cur_pal.push(s[i])
      if(canBuildPal(cur_pal)){
        //能够形成回文字串
        cur_pal.push(s[i])
        ans.length > cur_pal.length ? '' : ans = [...cur_pal]
      }else{
        cur_pal = [s[i]]
      }
    }
    return ans
}

function canBuildPal(arr){
  let head=0;
  let tail = arr.length-1
  while(head<tail){//双指针，头尾移动
    if(arr[head] !== arr[tail]) return false//不通过返回错误
    head += 1
    tail -= 1
  }
  return true//遍历通过返回正确
}

let ans = longestPalindrome("babad")
