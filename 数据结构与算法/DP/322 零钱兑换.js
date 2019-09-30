/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

示例 1:

输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1
示例 2:

输入: coins = [2], amount = 3
输出: -1
说明:
你可以认为每种硬币的数量是无限的。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/coin-change

 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    let resNum = Infinity
    for (let i = 0; i < coins.length; i++) {
        let curNum = curMinCost(coins, i, amount)
        if (curNum == -1) continue
        resNum = Math.min(curNum, resNum)
    }
    return resNum
};


function curMinCost(coins, end, amount) {
    //如果能够除尽，说明这就是最小的
    if(!(amount%coins[end])){
        return amount/coins[end]
    }
    //不能除尽，需要递归再次进行运行
    let curMaxNum = parseInt(amount/coins[end])
    let rest = amount - curMaxNum * coins[end]
    return curMinCost(coins,end-1,rest) + curMaxNum

}

coinChange([1, 2, 5], 11)
