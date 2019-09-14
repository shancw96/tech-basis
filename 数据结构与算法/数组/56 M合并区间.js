/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    /**
    相交的几种情况：
    1. 前一个 与 后一个相交
    2. 前一个包含后一个
    3. 后一个包含前一个 --> 后一个最小值比前一个最小值还要小，不符合假设的排序数组 
    
    
        1. 确认会相交
            + 前一个R 比 后一个L 大
        2. 合并相交区域
            + 前一个R 比 后一个L 大 
                前一个R 比后一个R大=> 保留前一个
                前一个R 比后一个L大=> 保留前一个第一个数和后一个最后一个数
    */
    //使用额外空间
    intervals.sort((interval_1, interval_2) => interval_1[0] - interval_2[0])
    let i = 0
    while (i < intervals.length - 1) {

        let left_L = intervals[i][0]
        let left_R = intervals[i][intervals[i].length - 1]
        let right_R = intervals[i + 1][intervals[i + 1].length - 1]
        let right_L = intervals[i + 1][0]
        //如果有重复
        if (left_R >= right_L) {
            if (left_R >= right_R) {
                intervals.splice(i + 1, 1)
            } else {
                intervals[i] = [left_L, right_R]
            }
        } else { //没有重复
            i += 1
        }
    }
    return intervals

};

function mergeSort(interval, left = 0, right = interval.length - 1) {
    if (left >= right) return
    //二分法，将数组分为左右两侧
    let mid = parseInt((left + right) / 2, 10)
    mergeSort(interval, left, mid)
    mergeSort(interval, mid + 1, right)
    //对左右两侧的排序数组进行合并
    return mergeTogether(interval, left, mid, right)
}


function mergeTogether(interval, left, right, mid, temp = []) {
    let start_L = left;
    let start_R = mid + 1;
    for (let k = left; k <= right; k++){
        temp[k] = interval[k]
    }
    for(let k = left; k <=right;k++){
        if(start_L > mid){
            interval[k] = temp[start_R++]
        }else if(start_R < mid){
            interval[k] = temp[start_L++]
        }else if(temp[start_L][0] < temp[start_R][0]){//右侧比左侧大
            interval[k] = temp[start_L++]
        }else if(temp[start_L][0] > temp[start_R][0]){
            interval[k] = temp[start_R++]
        }
    }
    return interval
}

let ans = mergeSort([
    [2, 3],
    [1, 6],
    [15, 19],
    [7, 18]
])
console.log(ans)