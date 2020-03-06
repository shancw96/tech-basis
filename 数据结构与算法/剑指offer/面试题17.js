/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function(n) {
    //10-1    1
    //10*10-1     2
    //10*10*10-1    3
    //10*..*10        n
        let limit = 1
        for(let i=0;i<n;i++){
            limit *=10
        }
        let resArr = []
        for(let i=1;i<limit;i++){
            resArr.push(i)
        }
        return resArr
    };

    printNumbers(2)