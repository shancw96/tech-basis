/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n,memo = {}) {
  if(memo[n]) return memo[n];
  if(n==0) return 1
  if(n==-1) return 0
  let res = climbStairs(n-1,memo)+climbStairs(n-2,memo)
  memo[n] = res
  return res
};