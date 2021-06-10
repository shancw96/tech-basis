var climbStairs = function(n) {
  // base case 
  // n === 1 -> 1
  // n === 2 -> 2
  // n <= 0 -> -1

  // 状态：楼梯
  // 选择 也就是导致「状态」产生变化的行为：每次爬楼梯的数量
  // 明确dp的含义: 爬指定台阶楼梯需要多少次
  const memo = [];
  function dp(n) {
      if (n === 1) return 1;
      if ( n === 2) return 2;
      if (n < 0) return -1;
      if (memo[n]) return memo[n];
      let ans = 0;
      let oneStep = dp(n - 1);
      let twoStep = dp(n - 2);
      if (oneStep >= 0) {
          memo[n-1] = oneStep;
          ans = ans + oneStep;
      }
      if (twoStep >= 0) {
        memo[n-2] = twoStep;
        ans = ans + twoStep;
      };
      return ans;
  }
  const ans = dp(n);
  return ans;
};

console.log(climbStairs(5));