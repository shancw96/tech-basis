/**
 * 归并排序
 *
 * 核心思想：分治
 * 将数组分为从中间切分为两个数组。（这两个数组也要经过归并排序，然后得出的最终排序数组）
 * 将两个数组，按照大小排序合并为一个并返回
 */
const createArr = require("./utils");
const mergeSort = arr => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2); //0.7 = 0
    const sortedL = mergeSort(arr.slice(0, mid));
    const sortedR = mergeSort(arr.slice(mid));
    return mergeTwoArrByOrder(sortedL, sortedR);
};

function mergeTwoArrByOrder(arr1, arr2) {
    //从小到大排列
    let point_1 = 0;
    let point_2 = 0;
    let res_arr = [];
    //遍历arr1 与 arr2
    while (point_1 < arr1.length && point_2 < arr2.length) {
        //同时存在
        arr1[point_1] < arr2[point_2] ? res_arr.push(arr1[point_1++]) : res_arr.push(arr2[point_2++]);
    }

    //arr1 提前结束
    if (point_1 >= arr1.length) {
        res_arr = [...res_arr, ...arr2.slice(point_2)];
    }
    //arr2 提前结束
    if (point_2 >= arr2.length) {
        res_arr = [...res_arr, ...arr1.slice(point_1)];
    }

    return res_arr;
}

console.log(mergeSort(createArr(10)));
