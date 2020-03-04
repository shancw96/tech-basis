/**
 * @description 将右上角第一个作为二叉树的root，然后二叉树搜索
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target,curPos={
    x:matrix.length>0 ? matrix[0].length-1 : undefined,
    y:0
}) {
    //从右上角开始root 用x y 表示
    //当前数 == target 正好找到
    //当前数 > target  target 在左侧
    //当前数 < target target 在右侧
    return isVaildPos(curPos,matrix)
        ? matrix[curPos.y][curPos.x] === target  
            ?true
            :findNumberIn2DArray(matrix,target,getNextNodePos(curPos,matrix[curPos.y][curPos.x] - target))
        :false
    
};
//获取当前节点的下一个节点
function getNextNodePos({x,y},flag){
    return flag > 0
            ?{x:x-1,y}
            :{x,y:y+1}
}

function isVaildPos({x,y},matrix){
    return (
        typeof x ==='number'
        && typeof y ==='number' 
        &&  x<= matrix[0].length-1 
        && y<=matrix.length-1
    )
        
}

console.log(findNumberIn2DArray([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
    ,5))





