var removeDuplicates = function(nums) {
    /**
    for i=1 to len 错误：删除后数组变短，i自主移动一格，
        if cur = prev : delete cur --- arr.split(i,1)
        else continue
    */
   //类似于快慢指针
    let index = 1
    while(index < nums.length){
        if(nums[index] == nums[index-1]) nums.splice(index,1)
        else index += 1
    }
    return nums
    
};

let ans = removeDuplicates([1,1,2])
console.log(ans)