/**
 * 
 * @param {/**
 * @param {number[]} T
 * @return {number[]}
 
 cur = 73 :
    74 > 73  o toTempStack ,countLen , reset tempStack
 cur = 74 :
    75 > cur o toTempStack ,countLen , reset tempStack
 cur = 75 :
    71 < 75 x toTempStack
    69 < 75 x toTempStack
    72 < 75 x toTempStack
    76 > 75 o toTempStack ,countLen , reset tempStack
...
init resArr = [0,0,0,0...]
for loop <curTemp>
    for loop <restTemp>
        restTemp to tempStack
        curTemp > rest ? 
            Y: countLen to resArr , reset tempStack
 
 */
var dailyTemperatures = function (T) {
    let resArr = [...Array(T.length)].map(_ => 0)
    let count
    //维护一个hash表，存储 temp:index O(n)
    for (let cur_index = 0; cur_index < T.length - 1; cur_index++) {
        count = 0
        //维护一个hash表，
        for (let rest_index = cur_index + 1; rest_index < T.length; rest_index++) {
            count += 1
            if (T[cur_index] < T[rest_index]) {
                resArr[cur_index] = count
                break
            }
        }
    }
    return resArr
};

var dailyTemperatures2 = function (T) {
    let resArr = [...Array(T.length)].map(_ => 0)
    let count
    //维护一个hash表，存储 temp:index O(n)
    for (let cur_index = 0; cur_index < T.length - 1; cur_index++) {
        hash[cur] > 
    }
    return resArr
};
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))