var minCostClimbingStairs = function(cost) {
  let copy = [...cost,0]
  return DP(copy)
};
function DP(cost,n=cost.length-1,memo= {}){
  if(memo[n]) return memo[n]
  if(n==0) return cost[0]
  if(n==1) return cost[1]
  else memo[n] = Math.min(DP(cost,n-1,memo),DP(cost,n-2,memo))+cost[n]
  return memo[n]
}
let res = minCostClimbingStairs([0,0,0,0,2,1])
console.log(res)