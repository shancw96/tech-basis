/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    let row = 0
    let col = 0
    let curDirection = 0
    // const direction = {
    //     right:0,
    //     down:1,
    //     left:2,
    //     up:3
    // }
    const matrixNum = matrix.length * matrix[0].length
    const ans = []
    //生成lock数组
    // let lock = Array(matrix.length).fill('').map(_=>Array(matrix[0].length).fill(false))
    let lock = {}

    for (let i = 0; i < matrixNum; i++) {
        lock[`${row}:${col}`] = true
        ans[i] = curDirection === 0 ?
            matrix[row][col++] :
            curDirection === 1 ?
            matrix[row++][col] :
            curDirection === 2 ?
            matrix[row][col--] :
            matrix[row--][col]
        while (!isVaildNextPath(row, col, lock)) {
            curDirection = switchDirection(curDirection)
        }
    }
    return ans

    function switchDirection(curDirection) {
        return curDirection + 1 === 4 ? 0 : curDirection + 1
    }

    function isVaildNextPath(row, col, lock) {
        return 0 <= row && row < matrix.length && 0 <= col && col < matrix[0].length && !lock[`${row}:${col}`]
    }
};

console.log(spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]))