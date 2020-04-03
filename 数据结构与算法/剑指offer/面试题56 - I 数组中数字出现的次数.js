var singleNumbers = function(nums) {
    nums.sort()
    let resArr = []
    let curIndex = 0
    while(curIndex < nums.length){
        if(resArr.length === 2) return resArr
        
        if(nums[curIndex] === nums[curIndex+1]){
            curIndex += 2
        }else{
            resArr.push(curIndex)
            curIndex += 1
        }
    }
};

console.log(singleNumbers([1,2,10,4,1,4,3,3]))