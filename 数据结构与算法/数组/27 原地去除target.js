var removeElement = function(nums, val) {
    /*
        while index< len
            if(cur === val) delete it
            else cur_index += 1
            
    */
    let index = 0
    while(index < nums.length){
        if(nums[index] === val) nums.splice(index,1)
        else index += 1
    }
};