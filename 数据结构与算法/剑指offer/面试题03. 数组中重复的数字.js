/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (numList) {
    //binary Search
    for (let index = 0; index < numList.length; index++) {
        const res = binarySearch([...numList.slice(0, index), ...numList.slice(index + 1)], numList[index])
        if (res > -1) return res
    }
    return 'notFound'
};

function binarySearch(arr, target, start = 0, end = arr.length - 1) {
    return start <= end ?
        arr[Math.floor((start + end) / 2)] == target ?
        target :
        arr[Math.floor((start + end) / 2)] < target ?
        binarySearch(arr, target, Math.floor((start + end) / 2) + 1, end) :
        binarySearch(arr, target, start, Math.floor((start + end) / 2) - 1) :
        -1
}


var findRepeatNumber_hash = function (numList) {
    //hashMap
    let dir = {}
    for (let num of numList) {
        if (dir[num]) return num
        dir[num] = true
    }

};

//3. 原地排序
function duplicate(array) {
    if (array.length === 0) return array
    for (let i = 0; i < array.length; i++) {
        while (array[i] !== i) {
            //当前的值与将要交换的值(index:array[i])是否相同
            //相同则返回值
            //不相同则交换位置
            if (array[i] === array[array[i]]) {
                return array[i]
            } else {
                // [array[i], array[array[i]]] = [array[array[i]], array[i]]
                const puppet = array[i]
                array[i] = array[puppet]
                array[puppet] = puppet
            }
        }
    }
}
console.log(duplicate([2, 3, 1, 0, 2, 5, 3]))