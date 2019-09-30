function findSubArrToK(arr, k) {
    arr.push(0)
    return rec(arr, arr.length - 1, k)
}

function rec(arr, pos, k, memo = {}) {
    if (memo[`${k}:${pos}`]) return memo[`${k}:${pos}`]
    //如果k==0 说明这一条路是正确的，能够形成K的 返回1
    //如果k<0 说明过大，这是错误的，返回0
    if (k == 0) return 1
    else if (k < 0 || pos < 0) return 0
    memo[`${k}:${pos}`] = rec(arr, pos - 1, k - arr[pos - 1], memo) + rec(arr, pos - 1, k, memo)
    
    return memo[`${k}:${pos}`]

}

// findSubArrToK([2, 4, 6, 10], 16)

const test = 1 ? 
                2:
                3