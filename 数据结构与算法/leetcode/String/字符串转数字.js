/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let matched = str.match(/^([' ']*)([-+]{0,1})\d+/g)||[]
    // matched.length?matched = matched[0] :matched = 0
    if(!matched.length){//matched 长度为0，代表匹配不成功
      return 0
    }
    matched = Number(matched[0].replace(/^([' '0]*)/,''))
    
    if(-2147483648<=matched && matched<=2147483648){
      return matched
    }else if(matched >0){
      return 2147483648
    }else{
      return -2147483648
    }

};

console.log(myAtoi("+"))