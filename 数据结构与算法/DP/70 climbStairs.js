/**
  假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */
var climbStairs_recursion = function (n, memo = {}) {
  if (memo[n]) return memo[n];
  if (n == 0) return 1
  if (n == -1) return 0
  let res = climbStairs_recursion(n - 1, memo) + climbStairs_recursion(n - 2, memo)
  memo[n] = res
  return res
};

var climbStairs_dp = n => {
  if (n < 2) return n + 1
  let dp = []
  // base situation 
  dp[0] = 1
  dp[1] = 2
  //common situation 
  for (let i = 2; i < n; i++) { //n-1 为最后一个台阶 n为顶部
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[dp.length - 1]
}

climbStairs_dp(3)