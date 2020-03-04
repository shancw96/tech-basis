/**
 * 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。

[["a","b","c","e"],
["s","f","c","s"],
["a","d","e","e"]]

但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    //从0,0 开始 ，挨个遍历
    for(let row = 0;row<board.length;row++){
        for(let col=0;col<board[0].length;col++){
            if(existCore(board,word,{row,col})) return true
        }
    }
    return false
    

    function existCore(matrix,word,{row,col},lock={}){
        //当前这个position 是否能行？
        if(!isVaildPath(matrix,word,{row,col},lock)) return false
        //将判断过的position 🔒
        lock = {...lock,[`${row}:${col}`]:true}
        const nextPosList = [{row:row+1,col},{row:row-1,col},{row:row,col:col+1},{row:row,col:col-1}]

        return word.length!==1?
            !!nextPosList.find(nextPos=>existCore(matrix,word.slice(1),nextPos,lock)):
            true
    }

    function isVaildPath(matrix,word,{row,col},lock){
        //1.不能越界
        const isInRange = 0<=row && row <= matrix.length-1 
        //2.不能被锁
        const isNotLocked = !lock[`${row}:${col}`]
        //3.当前坐标的值和word的值要一致
        // const isEqual = matrix[row][col] === word[0]
        return isInRange && isNotLocked && matrix[row][col] === word[0]
    }
};
