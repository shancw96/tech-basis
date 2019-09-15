var lengthOfLIS = function(nums) {
    if(!nums.length) return 0
    let dp = [1] // 当只有一个时，子序列长度为1
    for(let i = 1; i<nums.length;i++){
         dp[i] = 1
        for(let j=i-1;j>=0;j--){
            let temp = nums[j] >= nums[i] ? 1 : dp[j]+1
            dp[i] = Math.max(temp,dp[i])
        }
    }
    return dp.reduce((max,cur)=> max = cur > max ? cur :max,dp[0])
};
