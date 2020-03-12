function mergeSort(array) {
    if (array.length <= 1) return array
    const mid = parseInt(array.length / 2)
    //右边归并结果
    const leftArr = mergeSort(array.slice(0, mid))
    //右边归并结果
    const rightArr = mergeSort(array.slice(mid))
    //将左右两边按大小排序
    return merge(leftArr, rightArr)
}

//按照大小将两个数组排序
function merge(leftArr, rightArr,resArr=[]) {
    let pointL = 0
    let pointR = 0
    while(pointL < leftArr.length && pointR< rightArr.length){
        resArr.push(leftArr[pointL] >= rightArr[pointR] ? rightArr[pointR++] :leftArr[pointL++])
    }
    if(pointL < leftArr.length){
        resArr = resArr.concat(leftArr.slice(pointL))
    }
    if(pointR < rightArr.length){
        resArr = resArr.concat(rightArr.slice(pointR))
    }
    return resArr
}

console.log(mergeSort([1, 3, 2, 5, 12, 11]))