function findContinuousSequence(target){
    //滑动窗口
    let ans = []
    let sum = 0
    let pointL = 1
    let pointR = 1
    while(pointL <= Math.floor(target/2)){
        if(sum < target){
            sum += pointR
            pointR += 1
        }else if(sum > target){
            sum -= pointL
            pointL += 1
        }else{
            let curArr = []
            for(let i = pointL ;i < pointR;i++){
                curArr.push(i)
            }
            ans.push(curArr)
            //左边界移动
            sum -= pointL
            pointL += 1
        }
    }
    return ans
}

console.log(findContinuousSequence(9))