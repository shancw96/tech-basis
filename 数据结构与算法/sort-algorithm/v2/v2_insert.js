/**
 * 插入排序
 * 核心思想：从默认数组中挨个选取 值，插入新的数组中
 *
 * 1.选取默认数组的第一个值，作为 新数组 初始值
 * 2.从默认数组中有序取出值，
 * 3.与新数组从后往前比较(findCorrectPos::Array->Number->Number(等待插入的下标))
 * 如果(true)         新数组的当前值 > 选取的值        ：选取值与新数组的当前值的前一个值比较
 * 否则(false)         在新数组的当前值的后面插入选取的值(insert)
 *
 */
const getArr = require("./utils");
const insertSort = toBeSortArr => {
    return toBeSortArr
        .reduce(
            (sortedArr, toBeSortedVal) => {
                //从后往前选取新数组的值
                for (let i = sortedArr.length - 1; i >= 0; i--) {
                    const index = findCorrectPos(sortedArr, toBeSortedVal); //等待插入的下标 = sortedArr 的当前值下标 +1
                    return [...sortedArr.slice(0, index), toBeSortedVal, ...sortedArr.slice(index)];
                }
            },
            [-Infinity]
        )
        .slice(1);

    function findCorrectPos(arr, val, sortedValIndex = arr.length - 1) {
        if (arr[sortedValIndex] <= val) return sortedValIndex + 1;
        return findCorrectPos(arr, val, sortedValIndex - 1);
    }
};

console.log(insertSort(getArr(50)));
