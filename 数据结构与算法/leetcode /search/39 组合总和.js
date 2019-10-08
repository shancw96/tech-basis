/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let res_hash = {}
    let res = []
    combinationHelper('',target)
    return res


    function combinationHelper(curArr,target){
        if(target < 0){
            return 
        } //匹配失败
        if(target == 0) { //匹配成功
            //去重操作，利用hash
            curArr = curArr.split(',').sort((a,b)=>a-b).slice(1)
            console.log(curArr)
            curArrToStr = curArr.join('')
            if(!res_hash[curArrToStr]){
                res.push(curArr)
                res_hash[curArrToStr] = true 
            }

            return 
        }
        
        for(let val of candidates){
            combinationHelper(curArr+','+val,target - val)
        }
    }
};

combinationSum([3,12,9,11,6,7,8,5,4],15)