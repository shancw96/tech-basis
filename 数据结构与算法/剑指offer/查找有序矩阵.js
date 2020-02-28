/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    //分两步：确认列，确认行
    //确认列：列决定了每行的最小数字
    let maxRowIndexSmallerTarget = binarySearch(matrix, target)
    if (maxRowIndexSmallerTarget === 'matched') return true
    //确认行：行查找是否符合要求
    //2.查找方式：
    //1. n 复杂度 for循环
    //2. nlogn 二分法查找 + 最大值排除
    while (maxRowIndexSmallerTarget > -1) {
        const curRowResult = binarySearch(matrix[maxRowIndexSmallerTarget--], target)
        if (curRowResult === 'matched') return true
    }
    return false


};

//二分法搜索：传入为matrix ，则取每行第一个数
//返回小于 等于 target 的index
function binarySearch(array, target) {
    let lowIndex = 0
    let highIndex = array.length - 1
    while (lowIndex <= highIndex) {
        let midIndex = parseInt((lowIndex + highIndex) / 2)
        let mid = convertToShallow(array[midIndex])

        if (target === mid) return 'matched'
        target < mid ?
            highIndex = midIndex - 1 :
            lowIndex = midIndex + 1
    }
    return highIndex
}

function convertToShallow(array) {
    return array instanceof Array ? array[0] : array
}