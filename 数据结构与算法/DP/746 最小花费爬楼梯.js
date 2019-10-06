var minCostClimbingStairs = function(cost) {
    let accCost = []//爬到n层的消耗
    //base case
    accCost[0] = cost[0]
    accCost[1] = cost[1]
    for(let i=2 ; i<= cost.length;i++){
        let curCost = cost[i] || 0
        accCost[i] = Math.min(accCost[i-1],accCost[i-2]) + curCost
    }
    return accCost[cost.length]
};

minCostClimbingStairs([0,0,0,0])