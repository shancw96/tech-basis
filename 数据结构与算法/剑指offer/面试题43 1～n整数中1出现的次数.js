/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n) {
    if(n<1 || n>=2147483648) return 0
    let frequency = 0
    //遍历 from 0 to n 
    for(let i=1;i<=n;i++){
        frequency += countTagInArr(1,splitNum(i))
    }
    return frequency
};

function splitNum(num){
    let res = []
    //当num 为正整数
    while(num>0){
        res.push(num%10)
        num = Math.floor(num/10)
    }
    return res
}

function countTagInArr(tag,arr){
    return arr.reduce((acc,curNum)=>{
        return curNum === tag ? acc+1 : acc
    },0)
}


console.log(countDigitOne(13))