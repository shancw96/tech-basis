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
    //dp[i] 表示组成i块钱，需要的最少的硬币数量
    //第J个硬币我可以选择不拿，也可以选择哪
    //不拿dp[i] = dp[i]
    //拿dp[i] = dp[i-coin[j]] + 1

    if (amount === 0) {
        return 0;
      }
    //   const dp = Array(amount + 1).fill(Number.MAX_VALUE)
     let dp = [...Array(amount+1)].map(_=>Number.MAX_VALUE)
      dp[0] = 0;
      for (let i = 1; i <=amount; i++) {
        for (let j = 0; j < coins.length; j++) {
          if (i - coins[j] >= 0) {
            dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
          }
        }
      }
  
      return dp[dp.length - 1] === Number.MAX_VALUE ? -1 : dp[dp.length - 1];
};
let ans = coinChange_dp([1, 2, 5], 100)
console.log(ans)
