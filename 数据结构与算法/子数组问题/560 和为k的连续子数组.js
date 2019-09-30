var subarraySum = function (nums, k) {
    //1. 累加
    let hash = {}
    let prevCount = 0
    let accSum = nums
        .reduce((newArr, cur) => {
            // if (cur == k) prevCount += 1 //在累加之前遇到和与元素相等 那么子数组数量+1
            newArr.push(cur + newArr[newArr.length - 1])
            return newArr
        }, [0])

    return accSum.reduce((resNum, cur) => {//使用hash O(n)复杂度
        if (hash[cur]) resNum += hash[cur] //被减数 cur 是否存在
        hash[cur + k] ? hash[cur + k] += 1 : hash[cur + k] = 1 //减数+k 存在的话 次数+1，不存在的话，就建立一个
        return resNum
    }, prevCount)

};

console.log(subarraySum([1, 2, 1, 2, 1], 3))