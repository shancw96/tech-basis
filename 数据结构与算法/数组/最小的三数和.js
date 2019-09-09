var threeSumSmaller = function(nums, target) {
    nums.sort((a,b)=>a-b)
    let ans = 0
    nums.forEach((cur,index)=>{
            let L = index+1;
            let R = nums.length-1
            while(L<R){
                let sum = cur + nums[L]+nums[R]
                if(sum < target) {//sum 比 目标小，此时的R之前的全部符合要求
                    ans += R - L
                    L +=1
                }
                else R --
            }
    })
    return ans
};

let ans = threeSumSmaller([-3,-2,-2,0,1,3],2)
console.log(ans)