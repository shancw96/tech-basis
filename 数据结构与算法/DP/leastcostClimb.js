var minCostClimbingStairs = function(cost,n=cost.length,memo= {}) {
  if(memo[n]) return memo[n]
  if(n==0) return cost[0]
  if(n==1) return cost[1]
  else memo[n] = Math.min(minCostClimbingStairs(cost,n-1,memo),minCostClimbingStairs(cost,n-2,memo))+cost[n]
  return memo[n]
};

minCostClimbingStairs([0,0,0,0])