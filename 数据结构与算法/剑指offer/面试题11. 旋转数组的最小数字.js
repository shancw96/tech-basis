/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers,start=0,end=numbers.length-1) {
    //mid_val > right_val 转点在右侧
    //mid_val < right_val 转点在左侧
    //mid_val === right_val 10111 11101 左右都有可能，线性执行
    const mid = Math.floor((start+end)/2)
    return start < end ? 
        numbers[mid] === numbers[end] ?
            inorderMin(numbers):
            numbers[mid] > numbers[end]?
                minArray(numbers,mid+1,end):
                minArray(numbers,start,mid)
        :numbers[start]
};

function inorderMin(numbers){
    for(let i = 1 ; i < numbers.length-1;i++){
        if(numbers[i] < numbers[i-1]) return numbers[i]
    }
    return numbers[0]
}