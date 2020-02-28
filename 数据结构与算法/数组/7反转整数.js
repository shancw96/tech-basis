/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (num) {

    //1.abs(num) -> array
    const numArr = numToArray(Math.abs(num))
    //2.reverse array
    //1. 获取正负
    const tag = getNumTag(num)
    //2.1 stack 方式
    const reversedArr = numArr.reduce((prevArr, curNum) => [curNum, ...prevArr], [])
    //2.2 array 的reverse方法
    //2.3 递归 error 爆栈
    //3.array->num
    const resNum = tag === '-' ?
        arrayToNum(reversedArr) * -1 :
        arrayToNum(reversedArr)
    //4.isoverRange
    return isUnder32Bit(resNum) ? resNum : 0
};

//->Boolean
function isUnder32Bit(num) {
    return -2147483648 <= num && num <= 2147483647
}

//->Array
function getNumTag(num) {
    return num >= 0 ? '+' : '-'
}
//->Array
function numToArray(num) {
    return String(num).split('')
}
//->Number
function arrayToNum(arr) {
    return Number(arr.join(''))
}
console.log(reverse(-9999999999999999999999999999999999999999))