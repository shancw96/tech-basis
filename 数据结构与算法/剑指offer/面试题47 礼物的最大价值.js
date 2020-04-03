const showRecursion = require('../../utils/hoc/recursionLog')
let showLog = showRecursion((depth,row,col)=>{
    console.log(`${depth} ${row} : ${col} `)
})
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid ) {
    
    if(grid.length === 0 || grid[0].length === 0) return 0
    let memo = new Map()
    return maxValueCore(grid,grid.length-1,grid[0].length-1)

    function maxValueCore(grid,row,col){
        //最大路径问题
        //如果当前路径无效，则他的值为 0 
        if(!isVaildPath(grid,row,col)) return 0

        if(memo.has(`${row}:${col}`)) return memo.get(`${row}:${col}`)
        //curMax = prevMax + curVal
        let curVal = Math.max(maxValueCore(grid,row-1,col),maxValueCore(grid,row,col-1)) + grid[row][col]
        memo.set(`${row}:${col}`,curVal)
        return curVal
    }
};

function isVaildPath(grid,row,col){

    const isInGrid = row >= 0 && row <= grid.length && col >= 0 && col <= grid[0].length
    
    return isInGrid  
}

console.log(maxValue(
    [
        [1,3,1],
        [1,5,1],
        [4,2,1]
      ]
))