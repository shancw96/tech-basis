//迭代:搜索list，如果有则返回matched ，没有则返回小于target的最大index
function binarySearch2(list, target) {
    let start = 0
    let end = list.length - 1
    let mid = 0
    while (start <= end) {
        mid = parseInt((start + end) / 2)
        if (list[mid] === target) return 'matched'
        target < list[mid] ? end = mid - 1 : start = mid + 1
    }
    return end //结束返回比target 小的最大值的index
}

//递归
function binarySearch(list, target, start = 0, end = list.length - 1) {
    if (list.length === 0) return -1
    if (start <= end) {
        const mid = Math.floor((start + end) / 2)
        return list[mid] == target ?
            'matched' :
            list[mid] < target ?
            binarySearch(list, target, mid + 1, end) :
            binarySearch(list, target, start, mid - 1)

    }
    return end
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 5))