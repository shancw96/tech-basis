function maxProfit(prices){
    if(prices.length == 0) return 0
    let res = prices[0]
    for(let i = 0;i<prices.length;i++){
        let min = Math.min(min,prices[i])
        res = Math.max(res,prices[i] - min)
    }
    return res
    
}
//res = max(res, prices[i] - min_val);，res为前i天的最大收益，min_val为前i天的最小值。