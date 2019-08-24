/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if(!s.length) return true//空字符串
  
  let hash = {'(':1,')':-1,'[':10,']':-10,'{':100,'}':-100};//dictionary存储 符号：数字
  
  let stack = []//对大于0的符号进行入栈
  for(let target=0;target<s.length;target++){
      if(hash[s[target]] > 0){//非闭合
          stack.push(hash[s[target]])
          if(stack.length>s.length/2) return false
      }else{//对小于0的进行比较
          if(stack[stack.length-1]+hash[s[target]] == 0 ) stack.pop()
          else return false
      }
  }
  return !stack.length 
};

let res = isValid('((((((((')
res 