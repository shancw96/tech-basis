var isStraight = function(nums) {
    nums = nums.sort((a,b)=>a-b)
    //排序 -> 遍历 -> 
                //-> 记录0个数 kingNums 
                //-> curVal !== curVal + 1
                // Y:  kingNums === 0 ? return false : kingNums -= 1
    let kingNums = 0
    for(let i = 0; i < nums.length-1;i++){
        const curVal = nums[i]
        const nextVal = nums[i+1]
        if(curVal === 0){
            kingNums += 1
        }else if(curVal+1 !== nextVal){//前后不连续
            //前后值相等，或者没大小王 , 隔了超过一张的牌
            if(curVal === nextVal || kingNums === 0 || curVal+1+1 !== nextVal) return false
            //如果只隔了一张牌 ， 使用大小王作为替代
            kingNums -= 1
        }
    }
    return true
};

console.log(isStraight([10,11,0,12,6]))