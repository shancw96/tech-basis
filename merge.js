function mergeSort(array){
    if(array.length===1) return array
    const mid = Math.floor(array.length/2)
    const leftArr = mergeSort(array.slice(0,mid))
    const rightArr = mergeSort(array.slice(mid))
    return merge(leftArr,rightArr)
}
//排序数组
function merge(array1,array2){
    let res = []
    let pointL = 0
    let pointR = 0
    while(pointL < array1.length && pointR<array2.length){
        res.push(array1[pointL] > array2[pointR] ? array2[pointR++]:array1[pointL++])
    }
    return res.concat(getRestArr(pointL,array1)).concat(getRestArr(pointR,array2))
}

//如果index<array 会输出 剩余的 否则就是[]
function getRestArr(index,array){
    return index > array.length ?
        []:
        array.slice(index)
}

console.log(mergeSort([4,12,2,1]))

