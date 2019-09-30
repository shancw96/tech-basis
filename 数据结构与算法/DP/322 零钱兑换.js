/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

示 1:

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
var coinChange = function (coins, amount, memo = {}) {
    if (memo[amount]) return memo[amount]
    if (amount == 0) return 0
    let resNum = Infinity
    for (let i = 0; i < coins.length; i++) {
        if (amount - coins[i] < 0) continue; //如果遇到需要兑换的总额 比 零钱额度小 则跳过
        let curNum = coinChange(coins, amount - coins[i], memo) + 1 //当前的次数 = 还需兑换钱需要的次数 + 刚刚兑换的一次
        if (curNum > 0) {
            resNum = Math.min(curNum, resNum)
        }

    }
    return memo[amount] = resNum === Infinity ? -1 : resNum
};
var coinChange_dp = function (coins, amount) { 
    let dp = []
    dp[0] = 0 ;//amount = 0 res = 0
    for (let i = 1; i < amount ;i++) {
        for(let coin of coins){ //面额
            if(coin > i) continue
            dp[i] = Math.min(dp[i],dp[i-coin]+1) 
            /**
             *  f(n) 只与 f(n-1),f(n-2),f(n-5) 相关
             * 当 money = 15 时候
             * 取 1 ： cost = cost(14) + 1
             * 取 2 : cost = cost(13) + 1
             * 取 5 : cost = cost(10) + 1
             * 
             * 我们应该选取花费最小的一个
             * cost = min(cost(14),cost(13),cost(10))+1
             * 
             * for loop 实现上述思路
             * for(let coin of coins){
             *      cost = Math.min(cost,dp[cost-coin]+1)   Math.min(...)中的cost表示48行的三种情况
             * }
             * dp[i] = cost
             */
        }
    }
    // return memo[amount] = resNum === Infinity ? -1 : resNum
};
let ans = coinChange([1, 2, 5], 100)
console.log(ans)
