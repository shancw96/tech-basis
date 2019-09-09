/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort((a,b)=>a-b)
    let ans = [nums[0]+nums[1]+nums[2]]
    nums.some((cur,index)=>{
        if(!(index>0 && nums[index] === nums[index-1])){
            let L = index+1;
            let R = nums.length-1
            while(L<R){
                let sum = cur + nums[L]+nums[R]
                if(sum == target){
                    ans = target
                    return true
                }
                ans = Math.abs(target-sum) < Math.abs(target-ans) ? sum : ans 
                sum > target ? R-- : L++
            }
        }
    })
    return ans
};
let ans = threeSumClosest([-1,2,1,-4,0],2)
console.log(ans)