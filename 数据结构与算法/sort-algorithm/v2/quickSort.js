/**
 * 快排
 *  核心思想：选取基准值（一般为第一个），比基准值大的，放在基准值前面，比基准值大的放在基准值后面，递归进行操作
 *
 *
 */
const createArr = require("./utils");
const quickSort = arr => {
    //选取第一个，作为基准值，筛选出所以比基准值大的，筛选出所有比基准值小的。
    //对筛选出来的两个数组，重复进行上面操作，最终得到两个有序数组
    //return [...有序数组1,targetVal,...有序数组2]
    if (!arr.length) return [];

    const flagVal = arr[0];
    const [smallerRawArr, biggerRawArr] = divideArr(arr.slice(1), flagVal);
    return [...quickSort(smallerRawArr), flagVal, ...quickSort(biggerRawArr)];

    function divideArr(arr, flag) {
        return arr.reduce(
            (sortedArrs, curNum) => {
                curNum >= flag ? sortedArrs[1].push(curNum) : sortedArrs[0].push(curNum);
                return sortedArrs;
            },
            [[], []]
        );
    }
};

console.log(quickSort(createArr(50)));
