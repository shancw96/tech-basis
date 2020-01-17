/**
 * 希尔排序：
 * 核心思想：
 * 根据数组长度来生成一个跨度 k，arr[i] 与 arr[i+k] 相比较 arr[i+1] :arr[i+k+1] 一直到arr[x] : arr[arr.length-1]结束
 * 跨度在减小一倍，重复上述操作
 *
 * 细节操作：
 * 如果arr[i] > arr[i+k] 那么交换两值位置，并且arr[i+k] 再依次与前面已排序的数组按照跨度再次比较，直到不能移动为止
 *
 */

const shellSort = (arr, skip = Math.floor(arr.length / 2)) => {
    if (skip < 1) return arr;
    //执行调换操作
    let startPos = 0;
    while (startPos + skip < arr.length) {
        if (arr[startPos] <= arr[startPos + skip]) continue;
        arr = swap(arr, startPos, skip);

        //反向比较
        let reverseStartPos = startPos;
        while (reverseStartPos - skip >= 0 && arr[reverseStartPos] > arr[reverseStartPos - skip]) {
            arr = swap(arr, reverseStartPos - skip, reverseStartPos);
        }
    }
    console.log(arr);
    //减小skip 一倍，再次操作
    return shellSort(arr, Math.floor(skip / 2));
};

/**
 * 交换数组位置
 * @param {Array} arr 输入的数组
 * @param {Number} p1 下标1
 * @param {Number} p2 下标2
 * @returns {Array} 新的数组
 */
function swap(arr, p1, p2) {
    let copyArr = [...arr];
    [copyArr[p1], copyArr[p2]] = [copyArr[p2], copyArr[p1]];
    return copyArr;
}

console.log(shellSort([5, 2, 7, 1, 9]));
