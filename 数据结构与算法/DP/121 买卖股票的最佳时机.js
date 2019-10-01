/**
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。

示例 1:

输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
     profit[1] = 1 - subArrMin x
     profit[2] = 5 - subArrMin o   4
     profit[3] = 3 - subArrMin o   2
     profit[4] = 6 - subArrMin o   5

solution:1
     for loop <sold>:
        for loop find minBuy:
            sold > minBuy ? 
                Y: return -> sold - min 
                N :return -> -1
Time O(n^2)


solution2:
    define minBuy = arr[0]
    for loop <sold>
        sold > minBuy ? 
            Y: return -> sold-min 
            N: minBuy = sold 
               return -1
Time:O(n)
示例 2:

输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock
 */

 /**
 * @param {number[]} prices
 * @return {number}
 */

 //前i天的最大收益 = max{前i-1天的最大收益，第i天的价格-前i-1天中的最小价格}
 /**
  * dp[i] = max(dp[i-1],price[i] - minBuy)
  */

var maxProfit = function(prices,minBuy = prices[0]) {
    return prices.reduce((ans,sold)=>{
        sold > minBuy ? ans = Math.max(sold-minBuy,ans) : minBuy = sold
        return ans
    },0)
};

let ans = maxProfit([7,6,4,3,1])
console.log(ans)