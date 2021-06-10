
// 1、确定 base case
if (amount === 0) return 0;
if (amount < 0) return -1
// 2、确定「状态」
amount
// 3、确定「选择」，也就是导致「状态」产生变化的行为
// *** 硬币的面值，就是你的「选择」。
// 4、明确 dp 函数/数组的定义
// *** 传入指定的面额需要的coin 数量

function coinChange(amount, coins) {
  function dp(amount) {
    if (amount === 0) return 0;
    if (amount < 0) return -1
    let ans = Infinity;
    for(let i=0; i< coins.length; i+=1) {
      const tempAns = dp(amount - coins[i]);
      if (tempAns === -1) continue;
      ans = Math.min(ans, 1 + dp(amount - coins[i]))
    }
    return ans;
  }

  dp(amount)
}
