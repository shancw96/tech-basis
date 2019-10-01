/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let buy = []
    let sell = []
    /**
     * buy[i]表示第i天，且以buy结尾的最大利润
     * sell[i]表示第i天，且以sell结尾的最大利润
     */
    buy[0] = -prices[0]
    buy[1] = Math.max(-prices[0],-prices[1])

    sell[0] = 0
    sell[1] = Math.max(0,prices[1]-prices[0])

    for(let i = 2; i<prices.length;i++){
        //买或cooldown
        buy[i] = Math.max(buy[i-1],sell[i-2] - prices[i])
        //卖或者cooldown
        sell[i] = Math.max(sell[i-1],buy[i-1]+prices[i])
    }
    return Math.max(buy[prices.length - 1], sell[prices.length - 1], 0);
};