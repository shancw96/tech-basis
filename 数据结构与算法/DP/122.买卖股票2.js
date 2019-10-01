// var maxProfit = function(prices,res = 0 ,depth = 0) {
//     recursion_log_prev(prices,res,depth)
//     if(prices.length<=1) return 0
//     for(let day_index = 1 ; day_index<prices.length;day_index++){
//         let dayProfit = prices[day_index] - Math.min(...prices.slice(0,day_index+1))

//         //当前天的最大收益

//         let nextProfit = maxProfit(prices.slice(day_index),res,depth+1)
//         let curTotalProfit = dayProfit + nextProfit
//         //比较选择那一天开始值最大
//         res = Math.max(curTotalProfit,res)
//         recursion_log(day_index,res ,depth,curTotalProfit,dayProfit,nextProfit,prices[day_index],Math.min(...prices.slice(0,day_index+1)))
//     }
//     return res
// };
    
    

// maxProfit([7,1,5,3,6,4])
// function recursion_log_prev(prices,res,depth){
//     let logInfo = `调用前，价格表为${prices} 最大利润为${res}`
//     for(let i=0;i<depth;i++){
//         logInfo = '\t'+logInfo
//     }
//     console.log(logInfo)
// }
// function recursion_log(day_index,res ,depth,curTotalProfit,dayProfit,nextProfit,price,minBuy){
//     // console.log(`run maxProfit curPrice is : ${prices} curRes is :${res}`)
//     let logInfo = `调用后 最大利润 = ${res} 选择第 ${day_index+1} 天的最大收益 = ${curTotalProfit} = 当前天的最大收益 ${dayProfit} + 以后的最大收益 ${nextProfit}`
//     for(let i=0;i<depth;i++){
//         logInfo = '\t'+logInfo
//     }
//     console.log(logInfo)
// }

var maxProfit = function(prices) {
    let profit = 0;

    for(let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i -1]) {
            profit  = profit + prices[i] - prices[i - 1];
        }
    }

    return profit;
};