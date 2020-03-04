/**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
    let step = [1,1]
    if(n<=1) return step[n]
    for(let i=2;i<=n;i++){
        step[i] = (step[i-1]+step[i-2])%1000000007
    }
    return step[step.length-1]
};
const step = 7
console.log(numWays(step))