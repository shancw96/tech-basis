/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    if(x<-2147483647 || x> 2147483648 ||x == 0) return 0
    let isPostive = x>0?true:false
    let reverse_str = (Math.abs(x)+'').split('').reverse().join('')
    let result = isPostive?Number(reverse_str.match(/([1-9]).*/g)[0]):Number(`-${reverse_str.match(/([1-9]).*/g)[0]}`);
    if(result<-2147483647 || result> 2147483648) return 0
    else return result
  };
  

