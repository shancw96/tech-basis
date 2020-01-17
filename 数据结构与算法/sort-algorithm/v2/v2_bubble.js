/**
 * 冒泡排序
 *
 * 核心思想：
 *      从头开始两两比较，向右移动较大的，一次遍历结束，最右边的就是最大值
 *      重复遍历，最终得到排序数组
 *      T(n) = n^2
 */

const bubbleSort = arr => {
    // 重复遍历，最终得到排序数组
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            arr[j] > arr[j + 1] ? ([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]) : "";
        }
    }
    return arr;
};

const arr = Array(50)
    .fill("")
    .map(_ => Math.random() * 100);
