var spiralOrder = function(matrix) {
    let res = []
    while(matrix.length){
        res = res.concat(matrix[0])
        matrix = counterClockwise90(matrix.slice(1))
    }
    return res
    //取出第一行，执行旋转，重复操作
};

function counterClockwise90(matrix){
    if(!matrix.length) return []
    const colLen = matrix[0].length
    const rotatedMatrix = Array(matrix[0].length).fill('').map(_=>Array(matrix.length).fill(0))
    for(let row=0;row<matrix.length;row++){
        for(let col=0;col<colLen;col++){
            rotatedMatrix[colLen-col-1][row] = matrix[row][col]
        }
    }
    return rotatedMatrix
}



spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9,10,11,12]
  ])